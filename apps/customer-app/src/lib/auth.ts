import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { tanstackStartCookies } from "better-auth/tanstack-start"
import { lastLoginMethod } from "better-auth/plugins"
import { schema } from "@workspace/database"
import { env } from "@/env"
import * as templates from "./email/templates"
import { createId } from "@paralleldrive/cuid2"
import { emailClient } from "./email"
import { db } from "./db"
import { getOAuthState } from "better-auth/api"

export const auth = betterAuth({
  appName: "OpenGrid",
  appUrl: env.SELF_URL,
  baseURL: env.SELF_URL,
  basePath: "/api/auth",
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await emailClient.emails.send({
        from: `${env.EMAIL_SENDER_NAME} <${env.EMAIL_SENDER_ADDRESS}>`,
        to: user.email,
        subject: "Verify your email",
        react: templates.VerifyEmail({ username: user.name, verifyUrl: url }),
      })
    },
    sendOnSignUp: true,
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await emailClient.emails.send({
        from: `${env.EMAIL_SENDER_NAME} <${env.EMAIL_SENDER_ADDRESS}>`,
        to: user.email,
        subject: "Reset your password",
        react: templates.ForgotPasswordEmail({
          username: user.name,
          resetUrl: url,
          userEmail: user.email,
        }),
      })
    },
    requireEmailVerification: true,
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const additionalData = await getOAuthState()
          const emailPrefix = user.email.replace("@", "_") || "user"
          const username = `${emailPrefix}_${createId()}`

          return {
            data: {
              ...user,
              username,
              entityType: additionalData?.entityType ?? "CUSTOMER",
            },
          }
        },
      },
    },
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        input: true,
        required: true,
        unique: true,
        references: {
          model: "user",
          field: "username",
        },
        fieldName: "username",
      },
      entityType: {
        type: "string",
        input: true,
        required: true,
        references: {
          model: "user",
          field: "entityType",
        },
        defaultValue: "CUSTOMER",
        fieldName: "entityType",
      },
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [tanstackStartCookies(), lastLoginMethod()],
  advanced: {
    defaultCookieAttributes: {
      domain: env.BETTER_AUTH_DOMAIN, // <-- important: share across subdomains
      secure: true, // required for HTTPS
      sameSite: "lax", // allow cross-subdomain navigation
      httpOnly: true, // keep it safe from JS access
    },
  },
  trustedOrigins: [env.SELF_URL],
})

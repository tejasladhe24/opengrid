import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  server: {
    SELF_URL: z.url(),
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_DOMAIN: z.string().min(1),
    EMAIL_SENDER_NAME: z.string().min(1),
    EMAIL_SENDER_ADDRESS: z.email(),
    RESEND_API_KEY: z.string().min(1),
    ELECTRIC_SECRET: z.string().min(1),
    ELECTRIC_URL: z.url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
  },
  clientPrefix: "VITE_",
  client: {
    VITE_SELF_URL: z.url(),
  },
  runtimeEnv: {
    // server
    SELF_URL: process.env.SELF_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_DOMAIN: process.env.BETTER_AUTH_DOMAIN,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    EMAIL_SENDER_NAME: process.env.EMAIL_SENDER_NAME,
    EMAIL_SENDER_ADDRESS: process.env.EMAIL_SENDER_ADDRESS,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    ELECTRIC_SECRET: process.env.ELECTRIC_SECRET,
    ELECTRIC_URL: process.env.ELECTRIC_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    // client
    VITE_SELF_URL: import.meta.env.VITE_SELF_URL,
  },
})

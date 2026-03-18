import { createAuthClient } from "better-auth/react"
import {
  lastLoginMethodClient,
  genericOAuthClient,
  inferAdditionalFields,
  organizationClient,
  inferOrgAdditionalFields,
} from "better-auth/client/plugins"
import { env } from "@/env"

export const authClient = createAuthClient({
  baseURL: typeof window === "undefined" ? env.SELF_URL : env.VITE_SELF_URL,
  plugins: [
    lastLoginMethodClient(),
    genericOAuthClient(),
    organizationClient({
      schema: inferOrgAdditionalFields({
        organization: {
          additionalFields: {
            visibility: {
              type: "string",
              required: true,
              input: true,
            },
          },
        },
      }),
    }),
    inferAdditionalFields({
      user: {
        username: {
          type: "string",
          required: true,
          input: true,
        },
        entityType: {
          type: "string",
          required: true,
          input: true,
        },
      },
    }),
  ],
  fetchOptions: {
    credentials: "include",
  },
})

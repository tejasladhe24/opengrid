import { createAuthClient } from "better-auth/react"
import {
  lastLoginMethodClient,
  genericOAuthClient,
  inferAdditionalFields,
} from "better-auth/client/plugins"
import { env } from "@/env"

export const authClient = createAuthClient({
  baseURL: typeof window === "undefined" ? env.SELF_URL : env.VITE_SELF_URL,
  plugins: [
    lastLoginMethodClient(),
    genericOAuthClient(),
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

import { redirect } from "@tanstack/react-router"
import { createMiddleware } from "@tanstack/react-start"
import { getRequestHeaders } from "@tanstack/react-start/server"
import { authClient } from "@/lib/auth-client"

export const authMiddleware = createMiddleware({ type: "request" }).server(
  async ({ next }) => {
    const { data } = await authClient.getSession({
      fetchOptions: {
        headers: getRequestHeaders(),
      },
    })

    if (!data?.session || !data?.user) {
      throw redirect({ to: "/login" })
    }

    return await next({
      context: {
        session: data.session,
        user: data.user,
      },
    })
  }
)

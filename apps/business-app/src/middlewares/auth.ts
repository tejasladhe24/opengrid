import { redirect } from "@tanstack/react-router"
import { createMiddleware } from "@tanstack/react-start"
import { getRequestHeaders } from "@tanstack/react-start/server"
import { authClient } from "@/lib/auth-client"

export const authMiddleware = createMiddleware({ type: "request" }).server(
  async ({ next, request }) => {
    const { data } = await authClient.getSession({
      fetchOptions: {
        headers: getRequestHeaders(),
      },
    })

    if (!data?.session || !data?.user) {
      throw redirect({ to: "/login" })
    }

    const url = new URL(request.url)

    if (
      !data?.session?.activeOrganizationId &&
      !url.pathname.startsWith("/select-org")
    ) {
      throw redirect({ to: "/select-org" })
    }

    return await next({
      context: {
        session: data.session,
        user: data.user,
      },
    })
  }
)

import { auth } from "@/lib/auth"
import { authMiddleware } from "@/middlewares/auth"
import { createFileRoute } from "@tanstack/react-router"
import { getRequestHeaders } from "@tanstack/react-start/server"

export const Route = createFileRoute("/api/accept-invitation/$invitationId")({
  server: {
    middleware: [authMiddleware],
    handlers: {
      GET: async ({ params, request }) => {
        const { invitationId } = params
        const headers = getRequestHeaders()
        return auth.api
          .acceptInvitation({
            body: { invitationId: invitationId as string },
            headers,
          })
          .then(() => Response.redirect(new URL("/", request.url)))
          .catch((error) => {
            console.error(error)
            return Response.redirect(new URL("/", request.url))
          })
      },
    },
  },
})

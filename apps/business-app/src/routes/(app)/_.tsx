import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import { getSession } from "@/server/auth"
import { env } from "@/env"

export const Route = createFileRoute("/(app)/_")({
  component: Layout,
  loader: async (ctx) => {
    const session = await getSession()

    if (!session?.user?.id) {
      throw redirect({ to: "/login" })
    }

    const url = new URL(ctx.location.href, env.SELF_URL)

    if (
      !session?.session?.activeOrganizationId &&
      !url.pathname.startsWith("/select-org")
    ) {
      throw redirect({ to: "/select-org" })
    }
  },
})

function Layout() {
  return (
    <div className="flex h-full flex-col">
      <Outlet />
    </div>
  )
}

import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import { getSession } from "@/server/auth"

export const Route = createFileRoute("/(app)/_")({
  component: Layout,
  loader: async () => {
    const session = await getSession()

    if (!session?.user?.id) {
      throw redirect({ to: "/login" })
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

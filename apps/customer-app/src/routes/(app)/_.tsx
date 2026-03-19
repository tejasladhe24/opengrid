import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import { getSession } from "@/server/auth"

export const Route = createFileRoute("/(app)/_")({
  component: Layout,
  loader: () => getSession(),
})

function Layout() {
  const { session } = Route.useLoaderData()

  if (!session) {
    throw redirect({ to: "/login" })
  }

  return (
    <div className="flex h-full flex-col">
      <Outlet />
    </div>
  )
}

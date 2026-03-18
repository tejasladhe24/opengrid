import { Outlet, createFileRoute } from "@tanstack/react-router"
import { getSession } from "@/server/auth"

export const Route = createFileRoute("/(app)/_")({
  component: Layout,
  loader: () => getSession(),
})

function Layout() {
  return (
    <div className="flex h-full flex-col">
      <Outlet />
    </div>
  )
}

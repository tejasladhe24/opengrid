import { getSession } from "@/server/auth"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(app)/_/")({
  component: RouteComponent,
  loader: async () => {
    const session = await getSession()

    return { session }
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Customer App | OpenGrid",
      },
    ],
  }),
})

function RouteComponent() {
  const { session } = Route.useLoaderData()
  return <div>{JSON.stringify(session, null, 2)}</div>
}

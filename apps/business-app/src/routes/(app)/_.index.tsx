import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(app)/_/")({
  component: RouteComponent,
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
        title: "Business Dashboard | OpenGrid",
      },
    ],
  }),
})

function RouteComponent() {
  return <div>Hello "/(app)/_index"!</div>
}

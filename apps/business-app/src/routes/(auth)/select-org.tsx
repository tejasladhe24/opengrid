import { OrganizationsDataTable } from "@/components/orgs-data-table"
import { env } from "@/env"
import { getSession } from "@/server/auth"
import { createFileRoute } from "@tanstack/react-router"
import z from "zod"

export const Route = createFileRoute("/(auth)/select-org")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: SelectOrgForm,
  loader: async () => {
    const session = await getSession()

    return { session }
  },
  head: () => ({
    meta: [
      {
        title: "Select Organization - OpenGrid",
      },
      {
        name: "description",
        content: "Select a business to continue with OpenGrid.",
      },
      {
        name: "robots",
        content: "noindex, nofollow",
      },
    ],
  }),
})

function SelectOrgForm() {
  const redirectTo = Route.useSearch().redirect ?? env.VITE_SELF_URL

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex gap-2">
          <a href="#" className="flex items-center gap-2 font-medium">
            <img src={"/logo512.png"} alt="OpenGrid" width={60} height={24} />
          </a>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-10">
          <div className="w-full max-w-xl">
            <OrganizationsDataTable redirectTo={redirectTo} />
          </div>
        </div>
      </div>
    </div>
  )
}

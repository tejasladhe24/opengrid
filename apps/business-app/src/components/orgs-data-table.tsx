import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@workspace/ui/components/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { Switch } from "@workspace/ui/components/switch"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { env } from "@/env"
import {
  Dialog,
  DialogContent,
  useDialog,
} from "@workspace/ui/components/dialog"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { cn } from "@workspace/ui/lib/utils"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { Loader2Icon, LogOutIcon, PlusIcon } from "lucide-react"
import type { DBOrganization } from "@workspace/database"
import { useAuth } from "@/providers/auth"

const columns = ({
  redirectTo,
}: {
  redirectTo?: string
}): ColumnDef<DBOrganization>[] => [
  {
    accessorKey: "name",
    header: () => {
      return <h1 className="max-w-48 text-sm font-medium">Name</h1>
    },
    cell: ({ row }) => {
      return (
        <div
          className="flex cursor-default gap-2"
          onClick={() => {
            authClient.organization
              .setActive({
                organizationId: row.original.id,
              })
              .then(() => {
                window.location.href = redirectTo ?? env.VITE_SELF_URL
              })
          }}
        >
          <Avatar>
            <AvatarImage
              src={row.original.logo ?? ""}
              alt={row.original.name}
            />
            <AvatarFallback>
              {row.original.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <h1 className="text-sm font-medium">{row.original.name}</h1>
            <p className="text-sm text-muted-foreground">{row.original.slug}</p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <div className="text-sm text-muted-foreground">
          {row.original.createdAt.toLocaleDateString()}
        </div>
      )
    },
  },
]

export function OrganizationsDataTable({
  redirectTo,
}: {
  redirectTo?: string
}) {
  const { data: organizations } = authClient.useListOrganizations()

  const table = useReactTable({
    data: (organizations as DBOrganization[]) ?? [],
    columns: columns({ redirectTo }),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const { onOpen } = useDialog()

  const { data: activeOrganization } = authClient.useActiveOrganization()

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">All Organizations</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpen("create-organization")}
            >
              <PlusIcon className="size-4" />
              Add Organization
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      activeOrganization?.id === row.original.id && "bg-muted"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {table.getPageCount() > 1 && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        )}
      </div>
      <CreateOrganizationDialog />
    </>
  )
}

export const CreateOrganizationDialog = () => {
  const { type, isOpen, onClose } = useDialog()

  const isModalOpen = type === "create-organization" && isOpen

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="gap-0 p-0">
        <CreateOrganizationForm />
      </DialogContent>
    </Dialog>
  )
}

const schema = z.object({
  name: z.string().min(2).max(50),
  slug: z.string().min(2).max(50),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
})

interface CreateOrganizationFormProps {
  showSignOutButton?: boolean
  redirectTo?: string
}

export function CreateOrganizationForm({
  showSignOutButton = false,
  redirectTo,
}: CreateOrganizationFormProps) {
  const { user } = useAuth()

  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      visibility: "PUBLIC" as "PUBLIC" | "PRIVATE",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      if (!user?.id) {
        throw new Error("User not found")
      }

      try {
        const { data: newOrganization } = await authClient.organization.create({
          name: value.name,
          slug: value.slug,
          visibility: "PUBLIC" as const,
        })

        if (!newOrganization) {
          toast.error("Failed to create organization")
          return
        }

        onClose()

        toast.success("Organization created successfully")
        window.location.href = redirectTo ?? env.VITE_SELF_URL
      } catch (error) {
        console.error(error)
        toast.error("Failed to create organization")
      }
    },
  })

  const { onClose } = useDialog()

  const isLoading = form.state.isSubmitting

  return (
    <Card className="gap-0 overflow-y-auto p-0">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-2">
            <CardTitle>Create Organization</CardTitle>
            <CardDescription>
              Create a new organization to get started
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <CardAction>
              {showSignOutButton && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    authClient.signOut().then(() => {
                      window.location.reload()
                    })
                  }}
                  type="button"
                  size="icon"
                >
                  <LogOutIcon className="size-4" />
                </Button>
              )}
            </CardAction>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="flex flex-col gap-4"
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Name</FieldLabel>
                    <Input
                      placeholder="My Organization"
                      onChange={(e) => {
                        const value = e.target.value
                        field.handleChange(value)

                        const slug = value
                          .normalize("NFKD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .toLowerCase()
                          .trim()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-+|-+$/g, "")

                        form.setFieldValue("slug", slug)
                      }}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name="slug"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field>
                    <FieldLabel>Slug</FieldLabel>
                    <Input
                      placeholder="my-organization"
                      disabled
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        const value = e.target.value
                        field.handleChange(value)
                      }}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />

            <form.Field
              name="visibility"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field orientation="horizontal" data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor="form-tanstack-switch-twoFactor">
                        Keep Public
                      </FieldLabel>
                      <FieldDescription>
                        Choose the visibility of your organization.
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                    <Switch
                      id="form-tanstack-switch-twoFactor"
                      name={field.name}
                      checked={field.state.value === "PUBLIC"}
                      onCheckedChange={(checked) => {
                        field.handleChange(checked ? "PUBLIC" : "PRIVATE")
                      }}
                      aria-invalid={isInvalid}
                    />
                  </Field>
                )
              }}
            />

            <Field>
              <Button disabled={isLoading} type="submit">
                {isLoading ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  "Create Organization"
                )}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

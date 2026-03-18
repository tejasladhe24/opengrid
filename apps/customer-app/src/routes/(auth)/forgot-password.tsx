import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@workspace/ui/components/field"
import { createFileRoute } from "@tanstack/react-router"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { Loader2Icon } from "lucide-react"

export const Route = createFileRoute("/(auth)/forgot-password")({
  component: ForgotPasswordForm,
  head: () => ({
    meta: [
      {
        title: "Forgot Password - OpenGrid",
      },
      {
        name: "description",
        content: "Reset your OpenGrid account password.",
      },
      {
        name: "robots",
        content: "noindex, nofollow",
      },
    ],
  }),
})

const formSchema = z.object({
  email: z.email(),
})

function ForgotPasswordForm() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.requestPasswordReset({
        email: value.email,
        redirectTo: "/reset-password",
      })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Password reset email sent")
      }
    },
  })

  const isLoading = form.state.isSubmitting

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Forgot Password</CardTitle>
            <CardDescription>
              Enter your email to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
            >
              <FieldGroup>
                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="john.doe@example.com"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
              </FieldGroup>
              <Field orientation="horizontal">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </Field>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a className="underline underline-offset-4" href="/signup">
                  Sign up
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-center text-xs text-balance text-muted-foreground *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  )
}

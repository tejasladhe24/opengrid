import { env } from "@/env"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { useNavigate } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { useState } from "react"
import { LogoBusiness } from "@workspace/ui/components/logo"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@workspace/ui/components/card"
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@workspace/ui/components/field"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

import { createFileRoute } from "@tanstack/react-router"
import { Loader2Icon } from "lucide-react"

export const Route = createFileRoute("/(auth)/login")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: LoginForm,
  head: () => ({
    meta: [
      {
        title: "Login - OpenGrid",
      },
      {
        name: "description",
        content:
          "Login to OpenGrid and search businesses. Start your online business with OpenGrid.",
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
  password: z.string().min(8),
})

function LoginForm() {
  const redirectTo = Route.useSearch().redirect ?? env.VITE_SELF_URL
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { data, error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
        callbackURL: redirectTo,
      })

      if (data?.token) {
        toast.success("Login successful")
        navigate({ to: redirectTo })
      } else {
        toast.error(error?.message as string)
      }
    },
  })

  const isLoading = form.state.isSubmitting

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-transparent p-6 md:p-10">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              <LogoBusiness />
            </CardTitle>
            <CardDescription>Login to your Business Account</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-6"
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
            >
              <FieldGroup className="gap-6">
                <form.Field
                  name="email"
                  children={(field) => {
                    return (
                      <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                          placeholder="m@example.com"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </Field>
                    )
                  }}
                />
                <form.Field
                  name="password"
                  children={(field) => {
                    return (
                      <Field>
                        <FieldLabel>Password</FieldLabel>
                        <Input
                          placeholder="********"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="flex-1"
                          type={showPassword ? "text" : "password"}
                        />

                        <div className="flex items-center justify-between gap-2">
                          <Button
                            variant="link"
                            type="button"
                            className="font-normal"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? "Hide" : "Show"} Password
                          </Button>
                          <a
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                            href="/forgot-password"
                          >
                            Forgot your password?
                          </a>
                        </div>

                        {field.state.meta.isTouched &&
                          !field.state.meta.isValid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                      </Field>
                    )
                  }}
                />
                <Field>
                  <Button className="w-full" disabled={isLoading} type="submit">
                    {isLoading ? (
                      <Loader2Icon className="size-4 animate-spin" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </Field>
              </FieldGroup>
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

import { env } from "@/env"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
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
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import qs from "query-string"
import { Loader2Icon } from "lucide-react"

export const Route = createFileRoute("/(auth)/signup")({
  component: SignupForm,
  head: () => ({
    meta: [
      {
        title: "Sign Up - OpenGrid",
      },
      {
        name: "description",
        content:
          "Create your OpenGrid account and start searching businesses. Start your online business with OpenGrid.",
      },
      {
        name: "robots",
        content: "noindex, nofollow",
      },
    ],
  }),
})

const formSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
})

interface SignupFormProps {
  redirectTo?: string
}

function SignupForm({ redirectTo = env.VITE_SELF_URL }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const signUpResponse = await authClient.signUp.email({
        email: value.email,
        password: value.password,
        name: value.name,
        username: value.username,
        callbackURL: redirectTo,
        entityType: "CUSTOMER" as const,
      })

      if (signUpResponse.error) {
        toast.error(signUpResponse.error.message)
        return
      }

      toast.success(`${value.name} Please check your email for verification.`)

      const loginUrl = qs.stringifyUrl({
        url: `${env.VITE_SELF_URL}/login`,
        query: {
          redirect: redirectTo,
        },
      })

      navigate({ to: loginUrl })
    },
  })

  const isLoading = form.state.isSubmitting

  const navigate = useNavigate()

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-transparent p-6 md:p-10">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create an account</CardTitle>
            <CardDescription>Fill your details below</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-6"
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
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
                          placeholder="John Doe"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />

                <form.Field
                  name="username"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Username</FieldLabel>
                        <Input
                          placeholder="john_doe"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />

                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />

                <form.Field
                  name="password"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field>
                        <FieldLabel>Password</FieldLabel>
                        <Input
                          placeholder="********"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          type={showPassword ? "text" : "password"}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
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

                <Field>
                  <Button className="w-full" disabled={isLoading} type="submit">
                    {isLoading ? (
                      <Loader2Icon className="size-4 animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </Field>
              </FieldGroup>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a className="underline underline-offset-4" href="/login">
                  Login
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

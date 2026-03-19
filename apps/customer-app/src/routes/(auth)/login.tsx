import { env } from "@/env"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { Link, useNavigate } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { useEffect, useState } from "react"
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
import { Button, buttonVariants } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Input } from "@workspace/ui/components/input"
import { FaGoogle } from "react-icons/fa"
import { createFileRoute } from "@tanstack/react-router"
import { Logo } from "@workspace/ui/components/logo"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@workspace/ui/components/hover-card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import { Loader2Icon, UserCheckIcon } from "lucide-react"
import { getSession } from "@/server/auth"
import { cn } from "@workspace/ui/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Label } from "@workspace/ui/components/label"

export const Route = createFileRoute("/(auth)/login")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  loader: async () => {
    const session = await getSession()

    return { session }
  },
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
  const { session } = Route.useLoaderData()

  const [showPassword, setShowPassword] = useState(false)

  const lastMethod = authClient.getLastUsedLoginMethod()
  const navigate = useNavigate()

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo,
      additionalData: {
        isCustomer: true,
      },
    })
  }

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

  if (session.user) {
    return <LoggedIn />
  }

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-transparent p-6 md:p-10">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              <Logo />
            </CardTitle>
            <CardDescription>Login with your Google account</CardDescription>
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
                <Field>
                  <Button
                    className="relative w-full"
                    onClick={signInWithGoogle}
                    type="button"
                    variant="outline"
                  >
                    <FaGoogle />
                    Login with Google
                    {lastMethod === "google" && (
                      <Badge className="absolute right-2 text-[9px]">
                        Last used
                      </Badge>
                    )}
                  </Button>
                </Field>
              </FieldGroup>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
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

const TIMEOUT_SECONDS = 5

function LoggedIn() {
  const { session } = Route.useLoaderData()

  const [secondsLeft, setSecondsLeft] = useState(TIMEOUT_SECONDS)

  const initials = session?.user?.name
    ?.split(" ")
    .map((name: string) => name[0])
    .join("")

  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({ to: "/" })
    }, TIMEOUT_SECONDS * 1000)

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia className="size-auto">
          <UserCheckIcon className="size-8" />
        </EmptyMedia>
        <EmptyTitle>Already Logged In</EmptyTitle>
        <EmptyDescription>
          You are already logged in with
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="link" className="px-1">
                {session?.user?.email}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="flex w-64 flex-col gap-0.5">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={session?.user?.image ?? ""}
                    alt={session?.user?.name ?? ""}
                  />
                  <AvatarFallback className="rounded-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session?.user?.name ?? ""}
                  </span>
                  <span className="truncate text-xs">
                    {session?.user?.email ?? ""}
                  </span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          . You can continue to the home page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Link to="/" className={cn(buttonVariants({ variant: "link" }))}>
          Go to Home
        </Link>
        <Button variant="default" onClick={() => authClient.signOut()}>
          Log Out
        </Button>
      </EmptyContent>

      <Label className="font-normal text-muted-foreground">
        Redirecting to home in {secondsLeft} seconds...
      </Label>
    </Empty>
  )
}

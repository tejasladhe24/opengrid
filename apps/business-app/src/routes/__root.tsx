import { NotFound } from "@/components/not-found"
import { AuthProvider } from "@/providers/auth"
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { DialogProvider } from "@workspace/ui/components/dialog"
import { ThemeProvider } from "next-themes"
import appCss from "@workspace/ui/globals.css?url"
import { Toaster } from "sonner"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { Error } from "@/components/error"

export const Route = createRootRoute({
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
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
  errorComponent: Error,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="fixed flex h-svh w-full flex-col">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            storageKey="theme"
            enableSystem
            disableTransitionOnChange
          >
            <DialogProvider>
              {children}
              <Toaster />
            </DialogProvider>
          </ThemeProvider>
        </AuthProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />{" "}
      </body>
    </html>
  )
}

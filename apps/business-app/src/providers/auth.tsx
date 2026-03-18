import { authClient } from "@/lib/auth-client"
import type { DBUser, DBSession } from "@workspace/database"
import { createContext, useContext, useEffect, useState } from "react"

interface IAuthContext {
  session: DBSession | null
  user: DBUser | null
}

export const AuthContext = createContext<IAuthContext>({
  session: null,
  user: null,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<DBSession | null>(null)
  const [user, setUser] = useState<DBUser | null>(null)

  useEffect(() => {
    const getSession = () =>
      authClient
        .getSession({ fetchOptions: { credentials: "include" } })
        .then(({ data }) => {
          if (data?.session && data?.user) {
            setSession(data.session as DBSession)
            setUser(data.user as DBUser)
          } else {
            setSession(null)
            setUser(null)
          }
        })

    getSession()

    const interval = setInterval(() => {
      getSession()
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <AuthContext.Provider value={{ session, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

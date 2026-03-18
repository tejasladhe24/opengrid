import { env } from "@/env"
import { Resend } from "resend"

export const emailClient = new Resend(env.RESEND_API_KEY)

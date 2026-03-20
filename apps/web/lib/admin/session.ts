import { createHmac, timingSafeEqual } from "node:crypto"

import { loadMonorepoEnv } from "@workspace/db"
import { prisma } from "@workspace/db"
import type { AdminUser } from "@workspace/db"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

loadMonorepoEnv()

const ADMIN_COOKIE_NAME = "rm-textil-admin-session"

export interface AuthenticatedAdmin {
  id: string
  email: string
}

function createSessionSignature(admin: Pick<AdminUser, "id" | "passwordHash">) {
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.")
  }

  return createHmac("sha256", `${secret}:${admin.passwordHash}`)
    .update(admin.id)
    .digest("hex")
}

function safeCompare(a: string, b: string) {
  const left = Buffer.from(a, "hex")
  const right = Buffer.from(b, "hex")

  if (left.length !== right.length) {
    return false
  }

  return timingSafeEqual(left, right)
}

export async function createAdminSession(
  admin: Pick<AdminUser, "id" | "passwordHash">
) {
  const cookieStore = await cookies()
  const signature = createSessionSignature(admin)

  cookieStore.set(ADMIN_COOKIE_NAME, `${admin.id}.${signature}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
}

export async function getCurrentAdmin(): Promise<AuthenticatedAdmin | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value

  if (!session) {
    return null
  }

  const [adminId, signature] = session.split(".")

  if (!adminId || !signature) {
    return null
  }

  const admin = await prisma.adminUser.findUnique({
    where: { id: adminId },
  })

  if (!admin) {
    return null
  }

  const expectedSignature = createSessionSignature(admin)

  if (!safeCompare(signature, expectedSignature)) {
    return null
  }

  return {
    id: admin.id,
    email: admin.email,
  }
}

export async function requireCurrentAdmin() {
  const admin = await getCurrentAdmin()

  if (!admin) {
    redirect("/admin")
  }

  return admin
}

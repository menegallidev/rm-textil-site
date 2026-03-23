import { getAdminCategories, getAdminProducts } from "@workspace/db"

import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminLoginCard } from "@/components/admin/admin-login-card"
import { StatusBanner } from "@/components/admin/status-banner"
import { Container } from "@/components/layout/container"
import { getCurrentAdmin } from "@/lib/admin/session"

import {
  createCategoryAction,
  createProductAction,
  loginAdminAction,
  logoutAdminAction,
  toggleCategoryStatusAction,
  toggleProductStatusAction,
} from "./actions"

export const dynamic = "force-dynamic"

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    message?: string
    error?: string
  }>
}) {
  const { message, error } = await searchParams
  const admin = await getCurrentAdmin()

  if (!admin) {
    return (
      <>
        <Container className="pt-8">
          <StatusBanner message={message} error={error} />
        </Container>
        <AdminLoginCard action={loginAdminAction} />
      </>
    )
  }

  const [products, categories] = await Promise.all([
    getAdminProducts(),
    getAdminCategories(),
  ])

  return (
    <AdminDashboard
      adminEmail={admin.email}
      categories={categories}
      products={products}
      createCategoryAction={createCategoryAction}
      createProductAction={createProductAction}
      toggleCategoryStatusAction={toggleCategoryStatusAction}
      toggleProductStatusAction={toggleProductStatusAction}
      logoutAction={logoutAdminAction}
      message={message}
      error={error}
    />
  )
}

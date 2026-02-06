import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ModernDashboardWrapper } from "./ModernDashboardWrapper";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <ModernDashboardWrapper
      user={{
        name: session.user.name,
        email: session.user.email,
        image: session.user.image ?? undefined,
      }}
    />
  );
}

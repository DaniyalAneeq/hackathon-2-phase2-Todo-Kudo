import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ModernDashboardWrapper } from "./ModernDashboardWrapper";

export default async function DashboardPage() {
  let session;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch {
    redirect("/login");
  }

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

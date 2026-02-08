import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ModernTaskListWrapper } from "./ModernTaskListWrapper";

export default async function TaskListPage() {
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
    <ModernTaskListWrapper
      user={{
        name: session.user.name,
        email: session.user.email,
        image: session.user.image ?? undefined,
      }}
    />
  );
}

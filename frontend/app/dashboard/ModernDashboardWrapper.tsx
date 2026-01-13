"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { ModernDashboardClient } from "@/components/dashboard";

interface ModernDashboardWrapperProps {
  user: {
    name: string;
    email: string;
    image?: string;
  };
}

export function ModernDashboardWrapper({ user }: ModernDashboardWrapperProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to sign out");
        },
      },
    });
  };

  return <ModernDashboardClient user={user} onSignOut={handleSignOut} />;
}

"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { ModernTaskListClient } from "@/components/dashboard";

interface ModernTaskListWrapperProps {
  user: {
    name: string;
    email: string;
    image?: string;
  };
}

export function ModernTaskListWrapper({ user }: ModernTaskListWrapperProps) {
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

  return <ModernTaskListClient user={user} onSignOut={handleSignOut} />;
}

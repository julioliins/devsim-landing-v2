import { trpc } from "@/lib/trpc";
import { useCallback } from "react";

export function useSecurity() {
  const { data: sessions, isLoading } = trpc.security.getSessions.useQuery();
  const changePasswordMutation = trpc.security.changePassword.useMutation();
  const terminateSessionMutation = trpc.security.terminateSession.useMutation();

  const changePassword = useCallback(
    async (input: Parameters<typeof changePasswordMutation.mutateAsync>[0]) => {
      return changePasswordMutation.mutateAsync(input);
    },
    [changePasswordMutation]
  );

  const terminateSession = useCallback(
    async (sessionId: number) => {
      return terminateSessionMutation.mutateAsync({ sessionId });
    },
    [terminateSessionMutation]
  );

  return {
    sessions,
    isLoading,
    changePassword,
    terminateSession,
    isChangingPassword: changePasswordMutation.isPending,
    isTerminatingSession: terminateSessionMutation.isPending,
    passwordError: changePasswordMutation.error?.message,
  };
}

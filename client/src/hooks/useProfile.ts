import { trpc } from "@/lib/trpc";
import { useCallback } from "react";

export function useProfile() {
  const utils = trpc.useUtils();
  const { data, isLoading, error } = trpc.profile.get.useQuery();
  const updateMutation = trpc.profile.update.useMutation({
    onSuccess: () => {
      utils.profile.get.invalidate();
    },
  });
  const updateNotificationsMutation = trpc.profile.updateNotificationPreferences.useMutation({
    onSuccess: () => {
      utils.profile.get.invalidate();
    },
  });

  const updateProfile = useCallback(
    async (input: Parameters<typeof updateMutation.mutateAsync>[0]) => {
      return updateMutation.mutateAsync(input);
    },
    [updateMutation]
  );

  const updateNotifications = useCallback(
    async (input: Parameters<typeof updateNotificationsMutation.mutateAsync>[0]) => {
      return updateNotificationsMutation.mutateAsync(input);
    },
    [updateNotificationsMutation]
  );

  return {
    profile: data?.profile,
    user: data?.user,
    isLoading,
    error,
    updateProfile,
    updateNotifications,
    isUpdating: updateMutation.isPending || updateNotificationsMutation.isPending,
  };
}

import { trpc } from "@/lib/trpc";
import { useCallback } from "react";

export function usePrivacy() {
  const utils = trpc.useUtils();
  const { data: consents, isLoading } = trpc.privacy.getConsents.useQuery();
  const { data: exportRequests } = trpc.privacy.getExportRequests.useQuery();
  
  const updateConsentMutation = trpc.privacy.updateConsent.useMutation({
    onSuccess: () => {
      utils.privacy.getConsents.invalidate();
    },
  });
  
  const requestExportMutation = trpc.privacy.requestDataExport.useMutation({
    onSuccess: () => {
      utils.privacy.getExportRequests.invalidate();
    },
  });
  
  const deleteAccountMutation = trpc.privacy.deleteAccount.useMutation();

  const updateConsent = useCallback(
    async (input: Parameters<typeof updateConsentMutation.mutateAsync>[0]) => {
      return updateConsentMutation.mutateAsync(input);
    },
    [updateConsentMutation]
  );

  const requestDataExport = useCallback(
    async () => {
      return requestExportMutation.mutateAsync();
    },
    [requestExportMutation]
  );

  const deleteAccount = useCallback(
    async (confirmation: string) => {
      return deleteAccountMutation.mutateAsync({ confirmation });
    },
    [deleteAccountMutation]
  );

  return {
    consents,
    exportRequests,
    isLoading,
    updateConsent,
    requestDataExport,
    deleteAccount,
    isUpdatingConsent: updateConsentMutation.isPending,
    isRequestingExport: requestExportMutation.isPending,
    isDeletingAccount: deleteAccountMutation.isPending,
    deleteError: deleteAccountMutation.error?.message,
  };
}

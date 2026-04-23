import { trpc } from "@/lib/trpc";
import { useCallback } from "react";

export function useSupport() {
  const utils = trpc.useUtils();
  const { data: tickets, isLoading: ticketsLoading } = trpc.support.getTickets.useQuery();
  const { data: faqEntries, isLoading: faqLoading } = trpc.support.getFaq.useQuery();
  
  const submitTicketMutation = trpc.support.submitTicket.useMutation({
    onSuccess: () => {
      utils.support.getTickets.invalidate();
    },
  });
  
  const submitRatingMutation = trpc.support.submitRating.useMutation();

  const submitTicket = useCallback(
    async (input: Parameters<typeof submitTicketMutation.mutateAsync>[0]) => {
      return submitTicketMutation.mutateAsync(input);
    },
    [submitTicketMutation]
  );

  const submitRating = useCallback(
    async (input: Parameters<typeof submitRatingMutation.mutateAsync>[0]) => {
      return submitRatingMutation.mutateAsync(input);
    },
    [submitRatingMutation]
  );

  return {
    tickets,
    faqEntries,
    isLoading: ticketsLoading || faqLoading,
    submitTicket,
    submitRating,
    isSubmittingTicket: submitTicketMutation.isPending,
    isSubmittingRating: submitRatingMutation.isPending,
    ticketError: submitTicketMutation.error?.message,
  };
}

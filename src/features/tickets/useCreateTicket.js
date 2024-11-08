import { useMutation } from "@tanstack/react-query";
import { createTicket as createTicketApi } from "../../services/apiTickets";

export function useCreateTicket() {
  const {
    mutate: createTicket,
    error,
    isPending: isCreating,
  } = useMutation({
    mutationFn: createTicketApi,
    onSuccess: () => console.log("Success"),
    onError: () => console.log("Error"),
  });

  return { createTicket, error, isCreating };
}

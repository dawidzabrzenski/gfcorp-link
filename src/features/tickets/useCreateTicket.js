import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createTicket as createTicketApi } from "../../services/apiTickets";

export function useCreateTicket() {
  const {
    mutate: createTicket,
    error,
    isPending: isCreating,
  } = useMutation({
    mutationFn: createTicketApi,
    onSuccess: () => toast.success("Ticket successfully created"),
    onError: () => toast.error("There was an error creating the ticket"),
  });

  return { createTicket, error, isCreating };
}

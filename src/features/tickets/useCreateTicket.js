import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createTicket as createTicketApi } from "../../services/apiTickets";

export function useCreateTicket() {
  const queryClient = useQueryClient();

  const {
    mutate: createTicket,
    error,
    isPending: isCreating,
  } = useMutation({
    mutationFn: createTicketApi,
    onSuccess: () => (
      queryClient.invalidateQueries({ queryKey: ["tickets"] }),
      toast.success("Ticket successfully created")
    ),
    onError: () => toast.error("There was an error creating the ticket"),
  });

  return { createTicket, error, isCreating };
}

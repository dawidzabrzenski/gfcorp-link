import { useQuery } from "@tanstack/react-query";
import { getTicket } from "../../services/apiTickets";
import { useParams } from "react-router-dom";

export function useTicket() {
  const { id } = useParams();

  const {
    isPending: isFetchingTicket,
    data: ticket,
    error,
  } = useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicket(id),
    retry: false,
  });

  return { isFetchingTicket, ticket, error };
}

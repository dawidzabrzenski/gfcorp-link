import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../../services/apiTickets";

export function useTickets() {
  const {
    isPending: isFetching,
    data: tickets,
    error,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  return { isFetching, tickets, error };
}

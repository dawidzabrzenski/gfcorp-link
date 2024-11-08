import Spinner from "../../ui/Spinner";
import { useTicket } from "./useTicket";

function TicketDetail() {
  const { isFetchingTicket, error, ticket } = useTicket();

  if (isFetchingTicket) return <Spinner />;

  return <div>Test</div>;
}

export default TicketDetail;

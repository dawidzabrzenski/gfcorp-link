import Spinner from "../../ui/Spinner";
import TicketDetail from "./TicketDetail";
import TicketSidebar from "./TicketSidebar";

import { useTicket } from "./useTicket";

function TicketDetailPage() {
  const { isFetchingTicket, error, ticket } = useTicket();

  if (isFetchingTicket) return <Spinner />;

  return (
    <div className="flex h-full">
      <TicketDetail ticketData={ticket} />
      <TicketSidebar ticketData={ticket} />
    </div>
  );
}

export default TicketDetailPage;

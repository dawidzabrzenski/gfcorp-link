import SectionHeader from "../../ui/SectionHeader";
import Spinner from "../../ui/Spinner";
import BackButton from "../../ui/BackButton";

import { useTicket } from "./useTicket";
import { format } from "date-fns";

function TicketDetail({ ticketData }) {
  const { id, reporter, date: dateString, summary, description } = ticketData;
  const date = format(new Date(dateString), "yyyy-MM-dd, HH:mm:ss");

  return (
    <div className="w-[75%]">
      <div className="flex items-center px-4">
        <SectionHeader title={`Ticket #${id} ${summary}`}>
          <BackButton dir="/tickets" />
        </SectionHeader>
      </div>
      <div className="flex flex-col gap-4 px-4">
        <div className="bg-r flex w-full justify-center gap-4 text-sm text-gray-600">
          <p>Reporter: {reporter}</p>
          <p>Date: {date}</p>
        </div>
        <div className="h-full rounded-md bg-gray-50 px-12 py-4 text-justify">
          {description}
        </div>
      </div>
    </div>
  );
}

export default TicketDetail;

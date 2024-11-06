import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";
import Table from "../ui/Table";
import TableHeaderTitle from "../ui/TableHeaderTitle";
import SearchBar from "../ui/SearchBar";
import { useTickets } from "../features/tickets/useTickets";
import { getTickets } from "../services/apiTickets";
import Spinner from "../ui/Spinner";

function Tickets() {
  const { isFetching, tickets } = useTickets();
  console.log(tickets);

  if (isFetching) return <Spinner />;

  return (
    <div className="flex flex-col gap-6 px-6">
      <SectionHeader title="Tickets">
        <div className="flex gap-4">
          <SearchBar />
          <Button type="primary">New ticket</Button>
        </div>
      </SectionHeader>

      <Table columns="0.2fr 0.4fr 0.6fr 0.7fr 1fr 1fr 1fr">
        <Table.Header>
          <TableHeaderTitle>ID</TableHeaderTitle>
          <TableHeaderTitle>Date</TableHeaderTitle>
          <TableHeaderTitle>Request Type</TableHeaderTitle>
          <TableHeaderTitle>Status</TableHeaderTitle>
          <TableHeaderTitle>Summary</TableHeaderTitle>
          <TableHeaderTitle>Reporter</TableHeaderTitle>
          <TableHeaderTitle>Asignee</TableHeaderTitle>
        </Table.Header>
        <Table.Body
          data={tickets}
          render={(ticket) => <Table.Row tickets={ticket} key={ticket.id} />}
        />
      </Table>
    </div>
  );
}

export default Tickets;

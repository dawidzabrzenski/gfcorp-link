import { useTickets } from "../features/tickets/useTickets";

import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";
import Table from "../ui/Table";
import TableHeaderTitle from "../ui/TableHeaderTitle";
import SearchBar from "../ui/SearchBar";
import Spinner from "../ui/Spinner";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Tickets() {
  const { isFetching: isFetchingTickets, tickets } = useTickets();

  // if (isFetching) return <Spinner />;

  // if (isFetching)
  //   return (
  //     <div className="flex w-full items-center gap-6 px-12 py-4">
  //       <SkeletonTheme baseColor="#dbdbdb" highlightColor="#e2e2e2">
  //         <div>
  //           <Skeleton count={12} style={{ width: "18rem", height: "1.5rem" }} />
  //         </div>
  //       </SkeletonTheme>
  //     </div>
  //   );

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
        {isFetchingTickets ? (
          <div className="flex w-full items-center gap-6 px-12 py-4">
            <SkeletonTheme baseColor="#dbdbdb" highlightColor="#ece6e6">
              <div className="w-full">
                <Skeleton
                  count={12}
                  style={{
                    width: "100%",
                    height: "2rem",
                    marginBottom: "1rem",
                  }}
                />
              </div>
            </SkeletonTheme>
          </div>
        ) : (
          <Table.Body
            data={tickets}
            render={(ticket) => <Table.Row tickets={ticket} key={ticket.id} />}
          />
        )}
      </Table>
    </div>
  );
}

export default Tickets;

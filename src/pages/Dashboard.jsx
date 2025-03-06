import useUser from "../features/authentication/useUser";
import Skeleton from "react-loading-skeleton";
import { getProductsLocal } from "../services/apiProducts";

function Dashboard() {
  const { userData, isPending } = useUser();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-mainfont">Dashboard</h2>
      <h1 className="text-4xl font-semibold tracking-tight">
        Witaj
        {isPending ? (
          <span className="mx-4 inline-block">
            <Skeleton count={1} width={250} height={25} />
          </span>
        ) : (
          <span className="text-secfont">
            {" " + userData.firstName + " " + userData.lastName + " "}
          </span>
        )}
        👋
        <button onClick={() => getProductsLocal()}>test</button>
      </h1>
    </div>
  );
}

export default Dashboard;

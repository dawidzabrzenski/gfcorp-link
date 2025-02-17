import { useSelector } from "react-redux";
import DashboardCard from "../ui/DashboardCard";

function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-mainfont">Dashboard</h2>
      <h1 className="text-4xl font-semibold tracking-tight">
        Witaj <span className="text-dark-focusbord">Dawid Zabrzeński</span> 👋
      </h1>
      <div>
        <DashboardCard />
      </div>
    </div>
  );
}

export default Dashboard;

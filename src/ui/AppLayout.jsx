import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[20rem_1fr] grid-rows-[auto_1fr] overflow-hidden bg-dark-darkbg text-dark-main">
      <Sidebar />
      <main className="overflow-y-scroll px-12 py-12">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

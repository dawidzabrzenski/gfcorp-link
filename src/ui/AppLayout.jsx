import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="bg-dark-darkbg text-dark-main grid h-screen grid-cols-[20rem_1fr] grid-rows-[auto_1fr] overflow-hidden">
      <Sidebar />
      <main className="overflow-y-scroll px-12 py-12">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[22rem_1fr] grid-rows-[auto_1fr] overflow-hidden">
      <Header />
      <Sidebar />
      <main className="overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

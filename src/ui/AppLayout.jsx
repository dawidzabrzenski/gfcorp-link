import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

function AppLayout() {
  const location = useLocation();

  return (
    <div className="grid h-screen grid-cols-[20rem_1fr] overflow-hidden bg-dark-darkbg text-dark-main">
      <Sidebar />
      <main
        className={`min-h-full overflow-auto ${location.pathname === "/no-access" ? "bg-gradient-dark" : ""} px-12 py-12`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

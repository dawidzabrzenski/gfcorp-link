import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  const location = useLocation();
  console.log(location.pathname.slice(1).toUpperCase());

  return (
    <div className="grid h-screen grid-cols-[22rem_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

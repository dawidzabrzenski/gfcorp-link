import Copyright from "./Copyright";
import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="row-span-full flex flex-col gap-24 bg-gray-50 px-8 py-10">
      <Logo />
      <MainNav />
      <Copyright />
    </aside>
  );
}

export default Sidebar;

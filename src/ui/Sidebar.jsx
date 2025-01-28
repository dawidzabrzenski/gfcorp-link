import User from "./User";
import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="bg-dark-mainbg border-dark-mainborder row-span-full flex flex-col gap-4">
      <Logo />
      <MainNav />
      <User />
    </aside>
  );
}

export default Sidebar;

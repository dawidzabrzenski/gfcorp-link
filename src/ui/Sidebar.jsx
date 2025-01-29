import User from "./User";
import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="row-span-full flex flex-col gap-4 border border-dark-mainborder bg-dark-mainbg">
      <Logo />
      <MainNav />
      <User />
    </aside>
  );
}

export default Sidebar;

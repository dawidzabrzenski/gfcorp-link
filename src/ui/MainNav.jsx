import {
  HiOutlineHome,
  HiOutlineTicket,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog8Tooth,
} from "react-icons/hi2";
import NavItem from "./NavItem";

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <NavItem to={"/dashboard"}>
            <HiOutlineHome size={28} />
            <span>Dashboard</span>
          </NavItem>
        </li>
        <li>
          <NavItem to={"/tickets"}>
            <HiOutlineTicket size={28} />
            <span>Tickets</span>
          </NavItem>
        </li>
        <li>
          <NavItem to={"/chat"}>
            <HiOutlineChatBubbleLeftRight size={28} />
            <span>Chat</span>
          </NavItem>
        </li>
        <li>
          <NavItem to={"/settings"}>
            <HiOutlineCog8Tooth size={28} />
            <span>Settings</span>
          </NavItem>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;

import {
  HomeRounded as Home,
  CalendarMonthRounded as Calendar,
  SettingsRounded as Settings,
  ReceiptRounded as Receipt,
  AccountBoxRounded as Client,
  PeopleAltRounded as Users,
} from "@mui/icons-material";
import NavItem from "./NavItem";
import comarchLogo from "../assets/comarchlogo.webp";

const comarchSubmenu = [
  { name: "Klienci", link: "/clients", icon: <Client fontSize="small" /> },
  { name: "Faktury", link: "/invoice", icon: <Receipt fontSize="small" /> },
];

function MainNav() {
  return (
    <nav className="h-full">
      <ul className="flex flex-col justify-center gap-1 text-sm font-semibold text-dark-notactive">
        <li>
          <NavItem to={"/dashboard"}>
            <Home fontSize="small" />
            <p>Dashboard</p>
          </NavItem>
        </li>
        <li>
          <NavItem to={"/work-track"}>
            <Calendar fontSize="small" />
            <p>Czas pracy</p>
          </NavItem>
        </li>
        <li className="flex flex-col">
          <NavItem submenu={comarchSubmenu}>
            <div className="flex h-[20px] w-[20px] items-center justify-center">
              <img
                src={comarchLogo}
                className="h-[14px] w-[16px]"
                alt="Comarch XL Logo"
              />
            </div>
            <p>Comarch XL ERP</p>
          </NavItem>
        </li>
        <li>
          <NavItem to={"/users"}>
            <Users fontSize="small" />
            <p>Użytkownicy</p>
          </NavItem>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;

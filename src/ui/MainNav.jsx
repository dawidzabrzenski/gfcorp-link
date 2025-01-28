import {
  HomeRounded as Home,
  CalendarMonthRounded as Calendar,
  ArrowDropDownRounded as Arrow,
  SettingsRounded as Settings,
} from "@mui/icons-material";
import NavItem from "./NavItem";
import comarchLogo from "../assets/comarchlogo.webp";

function MainNav() {
  return (
    <nav className="h-full">
      <ul className="text-dark-notactive flex flex-col justify-center gap-1 font-semibold">
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
          <NavItem to={"/erp"}>
            <div className="flex h-[20px] w-[20px] items-center justify-center">
              <img
                src={comarchLogo}
                className="h-[14px] w-[16px]"
                alt="Comarch XL Logo"
              />
            </div>
            <p>Comarch XL ERP</p>
            <Arrow fontSize="medium" sx={{ marginLeft: "auto" }} />
          </NavItem>
        </li>
        <li>
          <NavItem to={"/work-track"}>
            <Settings fontSize="small" />
            <p>Ustawienia</p>
          </NavItem>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;

// src/components/MainNav.jsx
import { useQuery } from "@tanstack/react-query";
import { getPermissions } from "../services/apiPermissions";
import {
  HomeRounded as Home,
  CalendarMonthRounded as Calendar,
  SettingsRounded as Settings,
  ReceiptRounded as Receipt,
  AccountBoxRounded as Client,
  PeopleAltRounded as Users,
} from "@mui/icons-material";
import NavItem from "./NavItem";
import Spinner from "./Loaders/Spinner";
import comarchLogo from "../assets/comarchlogo.webp";

const token = localStorage.getItem("token");

const comarchSubmenu = [
  {
    name: "Klienci",
    link: "/erp/clients",
    icon: <Client fontSize="small" />,
    requiredPermission: "erp/clients",
  },
  {
    name: "Faktury",
    link: "/erp/invoices",
    icon: <Receipt fontSize="small" />,
    requiredPermission: "erp/invoices",
  },
];

function MainNav() {
  const {
    data: permissions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["permissions"],
    queryFn: () => getPermissions(token),
    enabled: !!token,
  });

  const filteredComarchSubmenu = comarchSubmenu.filter(
    (item) =>
      !item.requiredPermission ||
      permissions?.includes(item.requiredPermission),
  );

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Błąd pobierania uprawnień: {error.message}</div>;
  }

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
        {filteredComarchSubmenu.length > 0 && (
          <li className="flex flex-col">
            <NavItem submenu={filteredComarchSubmenu}>
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
        )}
        {permissions?.includes("users") && (
          <li>
            <NavItem to={"/users"}>
              <Users fontSize="small" />
              <p>Użytkownicy</p>
            </NavItem>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default MainNav;

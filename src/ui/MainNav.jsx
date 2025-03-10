import {
  HomeRounded as Home,
  CalendarMonthRounded as Calendar,
  SettingsRounded as Settings,
  ReceiptRounded as Receipt,
  AccountBoxRounded as Client,
  PeopleAltRounded as Users,
  CategoryRounded as Products,
  BadgeRounded as Permissions,
} from "@mui/icons-material";
import NavItem from "./NavItem";
import Spinner from "./Loaders/Spinner";
import comarchLogo from "../assets/comarchlogo.webp";
import { usePermissions } from "../features/permissions/usePermissions";

function MainNav() {
  const { permissions, pendingPermissions, errorPermissions } =
    usePermissions();

  const comarchSubmenu = [
    {
      name: "Klienci",
      path: "/erp/clients",
      icon: <Client fontSize="small" />,
      requiredPermission: "erp/clients",
    },
    {
      name: "Faktury",
      path: "/erp/invoices",
      icon: <Receipt fontSize="small" />,
      requiredPermission: "erp/invoices",
    },
    {
      name: "Produkty",
      path: "/erp/products",
      icon: <Products fontSize="small" />,
      requiredPermission: "erp/products",
    },
  ];

  const filteredComarchSubmenu = comarchSubmenu.filter(
    (item) =>
      !item.requiredPermission ||
      permissions?.includes(item.requiredPermission),
  );

  const sideMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Home fontSize="small" />,
    },
    {
      name: "Czas pracy B2B",
      path: "/work-track",
      icon: <Calendar fontSize="small" />,
    },
    {
      name: "Comarch XL ERP",
      icon: (
        <img
          src={comarchLogo}
          className="h-[14px] w-[16px]"
          alt="Comarch XL Logo"
        />
      ),
      submenu: filteredComarchSubmenu,
    },
    {
      name: "Użytkownicy",
      path: "users",
      icon: <Users fontSize="small" />,
      requiredPermission: "users",
    },
    {
      name: "Uprawnienia",
      path: "permissions",
      icon: <Permissions fontSize="small" />,
      requiredPermission: "permissions",
    },
  ];

  if (pendingPermissions) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (errorPermissions) {
    return <div>Błąd pobierania uprawnień: {errorPermissions.message}</div>;
  }

  return (
    <nav className="h-full">
      <ul className="flex flex-col justify-center gap-1 text-sm font-semibold text-dark-notactive">
        {sideMenu.map((el) => (
          <li key={el.name}>
            {!el.requiredPermission ||
            permissions?.includes(el.requiredPermission) ? (
              <NavItem to={el.path} submenu={el.submenu}>
                {el.icon}
                <p>{el.name}</p>
              </NavItem>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;

import {
  LogoutRounded as Logout,
  SettingsRounded as Settings,
} from "@mui/icons-material";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/apiAuth";
import { useAuth } from "../features/authentication/useAuth";

export function MenuPopup({ closeMenu, menuStatus }) {
  const ref = useOutsideClick(() => closeMenu());
  const navigate = useNavigate();

  const { refetch } = useAuth();

  async function handleLogout() {
    await logout();
    refetch();
  }

  return (
    <div
      className={`absolute bottom-12 left-0 overflow-hidden rounded-lg border border-dark-mainborder bg-dark-lightbg transition-all duration-300 ${
        menuStatus ? "opacity-100" : "opacity-0"
      }`}
    >
      <ul ref={ref} className="flex flex-col gap-3 px-2 py-2 text-xs">
        <li
          onClick={() => navigate("/settings")}
          className="hover:bg-dark-lighterbg flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-1 text-mainfont transition-all duration-300"
        >
          <Settings />
          <p>Ustawienia</p>
        </li>
        <li
          onClick={() => handleLogout()}
          className="hover:bg-dark-lighterbg flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-1 text-red-600 transition-all duration-300"
        >
          <Logout />
          <p>Wyloguj się</p>
        </li>
      </ul>
    </div>
  );
}

export default MenuPopup;

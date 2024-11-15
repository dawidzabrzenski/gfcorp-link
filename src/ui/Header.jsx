import {
  HiOutlineArrowRightStartOnRectangle,
  HiOutlineMoon,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { useLogout } from "../features/authentication/useLogout";

function Header() {
  const { logout, isPending } = useLogout();

  return (
    <div className="flex w-full items-center justify-end gap-6 px-12 py-4">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-blue-400"></div>
        <span>Dawid Zabrzeński</span>
      </div>
      <div className="flex items-center gap-2">
        <HiOutlineUserCircle size={36} className="header-btn" />
        <HiOutlineMoon size={36} className="header-btn" />
        <HiOutlineArrowRightStartOnRectangle
          onClick={() => logout()}
          size={36}
          className="header-btn"
        />
      </div>
    </div>
  );
}

export default Header;

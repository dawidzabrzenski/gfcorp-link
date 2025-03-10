import { useState } from "react";
import { MoreVertRounded as ThreeDots } from "@mui/icons-material";
import { useUser } from "../features/authentication/useUser";
import Skeleton from "react-loading-skeleton";

import MenuPopup from "./MenuPopup";

function User() {
  const { userData, isPending } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="mt-auto flex items-center justify-between border-t-[1px] border-dark-mainborder p-4">
      <div className="flex w-full flex-col gap-1">
        <div className="text-sm font-semibold tracking-tight">
          {isPending ? (
            <Skeleton count={1} width="90%" height={17} />
          ) : (
            <p>{userData.firstName + " " + userData.lastName}</p>
          )}
        </div>
        <div className="text-xs font-light text-dark-notactive">
          {isPending ? (
            <Skeleton count={1} width="90%" height={15} />
          ) : (
            <p>{userData.email}</p>
          )}
        </div>
      </div>
      <div
        onClick={() => setMenuOpen((menuOpen) => !menuOpen)}
        className="border-rounded relative cursor-pointer p-2 hover:border-dark-mainborderhover"
      >
        <MenuPopup closeMenu={closeMenu} menuStatus={menuOpen} />
        <ThreeDots fontSize="small" />
      </div>
    </div>
  );
}

export default User;

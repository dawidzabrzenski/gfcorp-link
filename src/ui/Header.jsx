import {
  HiOutlineArrowRightStartOnRectangle,
  HiOutlineMoon,
  HiOutlineUserCircle,
  HiUser,
} from "react-icons/hi2";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useLogout } from "../features/authentication/useLogout";
import { useUser } from "../features/authentication/useUser";

function Header() {
  const { logout, isPending } = useLogout();
  const { user, isPending: isPendingUser } = useUser();

  const { name, surname } = user.user_metadata;

  if (isPendingUser)
    return (
      <div className="flex w-full items-center justify-end gap-6 px-12 py-4">
        <SkeletonTheme baseColor="#dbdbdb" highlightColor="#e2e2e2">
          <div>
            <Skeleton
              circle
              count={1}
              style={{ width: "3rem", height: "3rem" }}
            />
          </div>
          <div>
            <Skeleton count={1} style={{ width: "18rem", height: "1.5rem" }} />
          </div>
        </SkeletonTheme>
      </div>
    );

  return (
    <div className="flex w-full items-center justify-end gap-6 px-12 py-4">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maincolor">
          <HiUser className="size-8 text-gray-100" />
        </div>
        <span>
          {!name && !surname ? (
            <span className="italic text-gray-400">undefined name</span>
          ) : (
            <>
              {name} {surname}
            </>
          )}
        </span>
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

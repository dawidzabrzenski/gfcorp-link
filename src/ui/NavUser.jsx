import { HiOutlineArrowRightStartOnRectangle } from "react-icons/hi2";

function NavUser() {
  return (
    <div className="mt-auto flex items-center justify-between rounded-lg bg-stone-200 px-4 py-4 text-stone-800">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-blue-400"></div>
        <span>Dawid Zabrzeński</span>
      </div>
      <HiOutlineArrowRightStartOnRectangle
        size={24}
        className="hover:text-maincolor cursor-pointer transition-all duration-100"
      />
    </div>
  );
}

export default NavUser;

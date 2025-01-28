import { MoreVertRounded as ThreeDots } from "@mui/icons-material";

function User() {
  return (
    <div className="border-dark-mainborder mt-auto flex items-center justify-between border-t-2 p-4">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold tracking-tight">Dawid Zabrzeński</p>
        <p className="text-dark-notactive text-xs font-light">
          dawid.zabrzenski@gfcorp.pl
        </p>
      </div>
      <div className="border-dark-mainborder hover:border-dark-mainborderhover cursor-pointer rounded-xl border p-2 transition-all duration-300">
        <ThreeDots fontSize="small" />
      </div>
    </div>
  );
}

export default User;

import { MoreVertRounded as ThreeDots } from "@mui/icons-material";

function User() {
  return (
    <div className="mt-auto flex items-center justify-between border-t-[1px] border-dark-mainborder p-4">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold tracking-tight">Dawid Zabrzeński</p>
        <p className="text-xs font-light text-dark-notactive">
          dawid.zabrzenski@gfcorp.pl
        </p>
      </div>
      <div className="cursor-pointer rounded-xl border border-dark-mainborder p-2 transition-all duration-300 hover:border-dark-mainborderhover">
        <ThreeDots fontSize="small" />
      </div>
    </div>
  );
}

export default User;

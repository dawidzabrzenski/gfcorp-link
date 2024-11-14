import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function BackButton({ dir }) {
  const navigate = useNavigate();

  return (
    <HiArrowLongLeft
      size={40}
      className="absolute -translate-x-14 rounded-lg bg-slate-100 transition-all hover:animate-backSectionHeaderButton hover:cursor-pointer hover:text-maincolor"
      onClick={() => navigate(dir)}
    />
  );
}

export default BackButton;

import { useNavigate } from "react-router-dom";
import NotFoundImg from "../assets/404.svg";
import Button from "../ui/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-grow flex-col items-center justify-center gap-4 bg-dark-mainbg bg-gradient-dark text-white">
        <img className="w-1/3" src={NotFoundImg} alt="Not found" />
        <div className="flex flex-col items-center justify-center">
          <p className="text-6xl text-dark-placeholder">404</p>
          <p className="text-2xl font-semibold">Nie znaleziono strony</p>
        </div>

        <div onClick={() => navigate("/dashboard", { replace: true })}>
          <Button type="button" buttonStyle="light">
            Wróć do Dashboarda
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

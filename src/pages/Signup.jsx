import Logo from "../ui/Logo";
import SignupForm from "../features/authentication/SignupForm";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-bgcolor">
      <div className="w-[30vw]">
        <Logo />
        <div className="mt-4 flex flex-col gap-8 rounded-lg border border-gray-200 bg-white px-12 py-8 shadow-md">
          <div>
            <h2 className="py-2 text-2xl">Adventure starts here 🚀</h2>
            <p>Streamline support, simplify success!</p>
          </div>
          <SignupForm />
          <p className="text-center text-sm text-gray-700">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-maincolorlighter transition-colors duration-300 hover:text-maincolorlightest"
              onClick={() => navigate("/login")}
            >
              Sign in instead
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

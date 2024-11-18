import Logo from "../ui/Logo";
import ForgotPasswordForm from "../features/authentication/ForgotPasswordForm";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-bgcolor">
      <div className="w-[30vw]">
        <Logo />
        <div className="mt-4 flex flex-col gap-8 rounded-lg border border-gray-200 bg-white px-12 py-8 shadow-md">
          <div>
            <h2 className="py-2 text-2xl">Forgot Password? 🔒</h2>
            <p className="text-gray-500">
              Enter your email and we'll send you instructions to reset your
              password
            </p>
          </div>
          <ForgotPasswordForm />

          <p
            className="cursor-pointer text-center text-sm text-maincolorlighter transition-colors duration-300 hover:text-maincolorlightest hover:underline"
            onClick={() => navigate("/login")}
          >
            <span className="text-lg">&#8592;</span> Sign in instead
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

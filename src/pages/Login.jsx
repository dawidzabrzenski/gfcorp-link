import { useNavigate } from "react-router-dom";
import { useLogin } from "../features/authentication/useLogin";
import LoginForm from "../features/authentication/LoginForm";
import LoginBackground from "../ui/LoginBackground";
import Logo from "../ui/Logo";
import Spinner from "../ui/Spinner";

function Login() {
  const navigate = useNavigate();

  const { login, isPending } = useLogin();

  return (
    <div className="flex">
      <div className="h-screen w-[70vw] bg-gray-100">
        <LoginBackground />
      </div>
      <div className="flex w-[30vw] flex-col items-start justify-center gap-6 px-24">
        <Logo />
        <div>
          <h2 className="mb-2 text-lg font-medium text-gray-500">
            Welcome to IssueNest! 👋
          </h2>
          <h3 className="text-sm text-gray-400">
            Please sign-in to your account and start the adventure
          </h3>
        </div>

        {isPending ? (
          <div className="mt-8 flex w-full justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="mb-4 w-full">
              <LoginForm login={login} isPending={isPending} />
            </div>
            <p className="w-full text-center text-sm text-gray-400">
              New on our platform?{" "}
              <span
                className="cursor-pointer text-maincolor transition-all duration-300 hover:text-maincolorlightest hover:underline"
                onClick={() => navigate("/signup")}
              >
                Create an account
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;

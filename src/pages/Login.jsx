import LoginForm from "../features/authentication/LoginForm";
import LoginBackground from "../ui/LoginBackground";
import Logo from "../ui/Logo";

function Login() {
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
        <div className="w-full">
          <LoginForm />
        </div>
        <p className="w-full text-center text-sm text-gray-400">
          New on our platform?{" "}
          <span className="hover:text-maincolorlightest cursor-pointer text-maincolor transition-all duration-300 hover:underline">
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

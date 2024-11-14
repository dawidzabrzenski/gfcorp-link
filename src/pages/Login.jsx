import LoginBackground from "../ui/LoginBackground";
import Logo from "../ui/Logo";

function Login() {
  return (
    <div className="flex">
      <div className="h-screen w-[70vw] bg-red-500">
        <LoginBackground />
      </div>
      <div className="flex w-[30vw] flex-col items-start justify-center gap-6 px-24">
        <Logo />
        <div className="text-stone-600">
          <h2 className="mb-2 text-lg font-medium">Welcome to IssueNest! 👋</h2>
          <h3 className="text-sm">
            Please sign-in to your account and start the adventure
          </h3>
        </div>
        <form></form>
      </div>
    </div>
  );
}

export default Login;

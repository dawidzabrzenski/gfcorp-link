import LoginForm from "../ui/Forms/LoginForm";
import LoadingScreen from "../ui/Loaders/LoadingScreen";
import { useLogin } from "../features/authentication/useLogin";

function Login() {
  const { login, error, isPending } = useLogin();

  return (
    <>
      {isPending && <LoadingScreen />}
      <div className="flex min-h-screen items-center justify-center bg-dark-mainbg bg-gradient-dark">
        <div className="text-dark-text w-full max-w-md rounded-lg border border-dark-mainborder bg-dark-mainbg p-8 shadow-xl">
          <h2
            className={`${error ? "mb-0" : "mb-4"} text-4xl font-semibold text-dark-main`}
          >
            Zaloguj się
          </h2>

          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default Login;

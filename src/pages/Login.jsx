import LoginForm from "../ui/Forms/LoginForm";
import LoadingScreen from "../ui/Loaders/LoadingScreen";
import { useLogin } from "../features/authentication/useLogin";

function Login() {
  const { isPending, error } = useLogin();

  return (
    <>
      {isPending && <LoadingScreen />}
      <div className="flex min-h-screen items-center justify-center bg-dark-mainbg bg-gradient-dark">
        <div className="text-dark-text w-full max-w-md rounded-lg border border-dark-mainborder bg-dark-mainbg p-8 shadow-xl">
          <h2
            className={`${error ? "mb-0" : "mb-6"} text-4xl font-semibold text-dark-main`}
          >
            Zaloguj się
          </h2>

          {error && (
            <div className="my-3 rounded-lg border border-red-700 bg-red-300 p-2 text-red-700">
              {error}
            </div>
          )}

          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default Login;

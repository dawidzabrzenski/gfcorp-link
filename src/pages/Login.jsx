import { useForm } from "react-hook-form";
import { useLogin } from "../features/authentication/useLogin";
import { useNavigate } from "react-router-dom";

import FormRow from "../ui/FormRow";
import LoadingScreen from "../ui/LoadingScreen";
import { useEffect } from "react";
import { useAuth } from "../features/authentication/useAuth";

function Login() {
  const { login, error, isPending } = useLogin();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const { email, password } = data;

    await login({ email, password });
  }
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormRow>
              <label className="text-dark-sec">Email</label>
              <input
                type="email"
                id="email"
                placeholder="twójmail@gfcorp.pl"
                className={`outline-blue relative rounded-lg border ${errors.email ? "border-red-800" : "border-dark-mainborder"} bg-dark-darkbg px-3 py-2 transition-all duration-300 placeholder:text-dark-placeholder hover:border-dark-mainborderhover`}
                {...register("email", {
                  required: "Email jest wymagany",
                })}
              />
              {errors.email && (
                <p className="absolute right-0 top-1 text-xs text-red-800">
                  {errors.email.message}
                </p>
              )}
            </FormRow>
            <FormRow>
              <label className="text-dark-sec">Hasło</label>
              <input
                type="password"
                id="password"
                autoComplete="new-password"
                placeholder="••••••"
                className={`outline-blue rounded-lg border ${errors.password ? "border-red-800" : "border-dark-mainborder"} bg-dark-darkbg px-3 py-2 transition-all duration-300 placeholder:text-dark-placeholder hover:border-dark-mainborderhover`}
                {...register("password", {
                  required: "Hasło jest wymagane",
                  minLength: {
                    value: 6,
                    message: "Hasło musi mieć przynajmniej 6 znaków",
                  },
                })}
              />
              {errors.password && (
                <p className="absolute right-0 top-1 text-xs text-red-800">
                  {errors.password.message}
                </p>
              )}
            </FormRow>

            <div className="flex items-center gap-3">
              <input id="remember-me" type="checkbox" value="" />
              <label htmlFor="remember-me" className="text-dark-main">
                Zapamiętaj mnie
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="outline-blue w-full rounded-lg bg-dark-main py-3 font-medium text-dark-darkbg transition-all duration-300 hover:bg-dark-mainhover"
            >
              Zaloguj
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

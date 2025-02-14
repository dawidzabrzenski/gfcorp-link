import FormRow from "../ui/FormRow";
import { useForm } from "react-hook-form";

import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const { email, password } = data;

    async function loginApi(email, password) {
      try {
        const res = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
        });

        console.log(res.data);
        console.log(res.data.message);
        console.log(res.data.token);

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
      } catch (error) {
        console.error(error.response?.data.message);
      }
    }
    loginApi(email, password);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-mainbg bg-gradient-dark">
      <div className="text-dark-text w-full max-w-md rounded-lg border border-dark-mainborder bg-dark-mainbg p-8 shadow-xl">
        <h2 className="mb-6 text-4xl font-semibold text-dark-main">
          Zaloguj się
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
            className="outline-blue w-full rounded-lg bg-dark-main py-3 font-medium text-dark-darkbg transition-all duration-300 hover:bg-dark-mainhover"
          >
            Zaloguj
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

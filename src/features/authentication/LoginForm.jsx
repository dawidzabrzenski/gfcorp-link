import { useState } from "react";
import FormRow from "../../ui/FormRow";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

function LoginForm({ login, isPending }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormRow label="Email address">
        <input
          className="w-full rounded-md border px-4 py-4 text-gray-700 transition duration-300 ease-in-out placeholder:font-light placeholder:text-gray-400 focus:border-transparent focus:shadow-lg focus:outline-maincolorlighter"
          type="email"
          id="email"
          autoComplete="username"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRow>
      <FormRow className="relative w-full">
        <input
          type={isPasswordVisible ? "text" : "password"}
          className="w-full rounded-md border px-4 py-4 text-gray-700 transition duration-300 ease-in-out placeholder:font-light placeholder:text-gray-400 focus:border-transparent focus:shadow-lg focus:outline-maincolorlighter"
          id="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
          onClick={() => setIsPasswordVisible((status) => !status)}
        >
          {isPasswordVisible ? (
            <IoMdEye size={18} className="text-gray-400" />
          ) : (
            <IoMdEyeOff size={18} className="text-gray-400" />
          )}
        </div>
      </FormRow>
      <p className="ml-auto cursor-pointer text-sm text-maincolor underline-offset-2 transition-colors duration-300 hover:text-maincolorlightest hover:underline">
        Forgot Password?
      </p>
      <button className="box-sh mb-2 mt-4 w-full rounded-lg bg-maincolorlighter py-3 text-slate-50 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-maincolordarker">
        SIGN IN
      </button>
    </form>
  );
}

export default LoginForm;

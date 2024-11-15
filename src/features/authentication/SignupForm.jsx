import { useState } from "react";
import { useLogin } from "./useLogin";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending } = useLogin();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { register, formState, getValues, reset } = useForm();

  function handleSubmit(e) {
    e.preventDefault();

    // if (!email || !password) return;
    // login(
    //   { email, password },
    //   {
    //     onSettled: () => {
    //       setEmail("");
    //       setPassword("");
    //     },
    //   },
    // );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <FormRow label="Email address">
        <input
          className="w-1/2 rounded-md border px-4 py-4 text-gray-700 transition duration-300 ease-in-out placeholder:font-light placeholder:text-gray-400 focus:border-transparent focus:shadow-lg focus:outline-maincolorlighter"
          type="email"
          id="email"
          autoComplete="username"
          placeholder="Enter your name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
        <input
          className="w-1/2 rounded-md border px-4 py-4 text-gray-700 transition duration-300 ease-in-out placeholder:font-light placeholder:text-gray-400 focus:border-transparent focus:shadow-lg focus:outline-maincolorlighter"
          type="email"
          id="email"
          autoComplete="username"
          placeholder="Enter your surname"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label="Email address">
        <input
          className="w-full rounded-md border px-4 py-4 text-gray-700 transition duration-300 ease-in-out placeholder:font-light placeholder:text-gray-400 focus:border-transparent focus:shadow-lg focus:outline-maincolorlighter"
          type="email"
          id="email"
          placeholder="Enter your email"
          disabled={isPending}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            },
          })}
        />
      </FormRow>
      <FormRow className="relative w-full">
        <input
          type={isPasswordVisible ? "text" : "password"}
          className="w-full rounded-md border px-4 py-4 text-gray-700 transition duration-300 ease-in-out placeholder:font-light placeholder:text-gray-400 focus:border-transparent focus:shadow-lg focus:outline-maincolorlighter"
          id="password"
          autoComplete="current-password"
          placeholder="············"
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
      <div className="flex gap-2">
        <input type="checkbox" className="w-8" />
        <p className="text-sm text-gray-700">
          I agree to{" "}
          <span className="duration-300text-maincolorlighter cursor-pointer transition-colors hover:text-maincolorlightest">
            privacy policy & terms
          </span>
        </p>
      </div>
      <button className="box-sh mb-2 mt-4 w-full rounded-lg bg-maincolorlighter py-3 text-slate-50 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-maincolordarker">
        SIGN UP
      </button>
    </form>
  );
}

export default SignupForm;

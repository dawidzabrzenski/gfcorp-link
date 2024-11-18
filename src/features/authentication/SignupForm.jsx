import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { useLogin } from "./useLogin";
import { useSignup } from "./useSignup";

import FormRow from "../../ui/FormRow";

function SignupForm() {
  const { signup, isPending: isSigningUp } = useSignup();

  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatPassVisible, setIsRepeatPassVisible] = useState(false);

  const navigate = useNavigate();

  function onSubmit({ name, surname, email, password }) {
    signup(
      { name, surname, email, password },
      {
        onSettled: () => (reset(), navigate("/login")),
      },
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <FormRow label="Email address">
        <input
          className="w-1/2 rounded-md border px-4 py-2 text-sm text-gray-700 transition duration-300 ease-in-out placeholder:font-light placeholder:text-gray-400 focus:border-transparent focus:shadow-lg focus:outline-maincolorlighter"
          type="text"
          id="name"
          autoComplete="given-name"
          placeholder="Enter your name"
          disabled={isSigningUp}
          {...register("name")}
        />
        <input
          className="w-1/2 rounded-md border px-4 py-2 text-sm text-gray-700 transition duration-300 ease-in-out placeholder:font-light placeholder:text-gray-400 focus:border-transparent focus:shadow-lg focus:outline-maincolorlighter"
          type="text"
          id="surname"
          autoComplete="family-name"
          placeholder="Enter your surname"
          disabled={isSigningUp}
          {...register("surname")}
        />
      </FormRow>
      <FormRow label="Email address" error={errors?.email?.message}>
        <input
          className="w-full rounded-md border px-4 py-2 text-sm text-gray-700 transition duration-300 ease-in-out placeholder:font-light placeholder:text-gray-400 focus:border-transparent focus:shadow-lg focus:outline-maincolorlighter"
          type="email"
          id="email"
          placeholder="Enter your email"
          disabled={isSigningUp}
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
      <FormRow
        className="relative w-full"
        error={errors?.passwordConfirm?.message}
      >
        <input
          type={isPasswordVisible ? "text" : "password"}
          className="w-full rounded-md border px-4 py-2 text-sm text-gray-700 transition duration-300 ease-in-out placeholder:font-light placeholder:text-gray-400 focus:border-transparent focus:shadow-lg focus:outline-maincolorlighter"
          id="password"
          autoComplete="current-password"
          placeholder="Password (Min. 8 characters)"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
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
      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <input
          type={isRepeatPassVisible ? "text" : "password"}
          className="w-full rounded-md border px-4 py-2 text-sm text-gray-700 transition duration-300 ease-in-out placeholder:font-light placeholder:text-gray-400 focus:border-transparent focus:shadow-lg focus:outline-maincolorlighter"
          id="passwordConfirm"
          placeholder="Repeat Password"
          disabled={isSigningUp}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
        <div
          className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
          onClick={() => setIsRepeatPassVisible((status) => !status)}
        >
          {isRepeatPassVisible ? (
            <IoMdEye size={18} className="text-gray-400" />
          ) : (
            <IoMdEyeOff size={18} className="text-gray-400" />
          )}
        </div>
      </FormRow>
      <div className="flex gap-2">
        <input type="checkbox" className="w-8" required />
        <p className="text-sm text-gray-700">
          I agree to{" "}
          <span className="duration-300text-maincolorlighter cursor-pointer transition-colors hover:text-maincolorlightest">
            privacy policy & terms
          </span>
        </p>
      </div>
      <button
        disabled={isSigningUp}
        className="box-sh mb-2 mt-4 w-full rounded-lg bg-maincolorlighter py-3 text-slate-50 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-maincolordarker"
      >
        SIGN UP
      </button>
    </form>
  );
}

export default SignupForm;

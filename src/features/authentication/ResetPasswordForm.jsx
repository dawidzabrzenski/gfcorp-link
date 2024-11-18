import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useRecover } from "./useRecover";

import FormRow from "../../ui/FormRow";

function ResetPasswordForm() {
  const { recoverPass, isPending } = useRecover();

  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();

  function onSubmit({ email }) {
    recoverPass(
      { email },
      {
        onSettled: () => (reset(), navigate("/login")),
      },
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <FormRow label="Email address" error={errors?.email?.message}>
        <input
          className="w-full rounded-md border px-4 py-2 text-sm text-gray-700 transition duration-300 ease-in-out placeholder:font-light placeholder:text-gray-400 focus:border-transparent focus:shadow-lg focus:outline-maincolorlighter"
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

      <button
        disabled={isPending}
        className="box-sh mb-2 mt-4 w-full rounded-lg bg-maincolorlighter py-3 text-slate-50 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-maincolordarker"
      >
        Send Reset Link
      </button>
    </form>
  );
}

export default ResetPasswordForm;

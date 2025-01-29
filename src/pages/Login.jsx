import React, { useState } from "react";
import FormRow from "../ui/FormRow";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-mainbg bg-gradient-dark">
      <div className="text-dark-text w-full max-w-md rounded-lg border border-dark-mainborder bg-dark-mainbg p-8 shadow-xl">
        <h2 className="mb-6 text-4xl font-semibold text-dark-main">
          Zaloguj się
        </h2>

        <form className="flex flex-col gap-6">
          <FormRow>
            <label className="text-dark-sec">Email</label>
            <input
              type="email"
              id="email"
              placeholder="twójmail@gfcorp.pl"
              className="outline-blue rounded-lg border border-dark-mainborder bg-dark-darkbg px-3 py-2 transition-all duration-300 placeholder:text-dark-placeholder hover:border-dark-mainborderhover"
            />
          </FormRow>
          <FormRow>
            <label className="text-dark-sec">Hasło</label>
            <input
              type="password"
              id="password"
              autocomplete="new-password"
              placeholder="••••••"
              className="outline-blue rounded-lg border border-dark-mainborder bg-dark-darkbg px-3 py-2 transition-all duration-300 placeholder:text-dark-placeholder hover:border-dark-mainborderhover"
            />
          </FormRow>

          <div class="flex items-center gap-3">
            <input id="remember-me" type="checkbox" value="" />
            <label for="remember-me" className="text-dark-main">
              Zapamiętaj mnie
            </label>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
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

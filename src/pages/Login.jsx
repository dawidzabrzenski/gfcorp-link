import React, { useState } from "react";
import FormRow from "../ui/FormRow";

function Login() {
  return (
    <div className="bg-gradient-dark bg-dark-mainbg flex min-h-screen items-center justify-center">
      <div className="bg-dark-mainbg text-dark-text border-dark-mainborder w-full max-w-md rounded-lg border p-8 shadow-xl">
        <h2 className="text-dark-main mb-6 text-4xl font-semibold">
          Zaloguj się
        </h2>

        <form className="flex flex-col gap-6">
          <FormRow>
            <label className="text-dark-sec">Email</label>
            <input
              type="email"
              id="email"
              placeholder="twójmail@gfcorp.pl"
              className="bg-dark-darkbg border-dark-mainborder hover:border-dark-mainborderhover placeholder:text-dark-placeholder outline-blue rounded-lg border px-3 py-2 transition-all duration-300"
            />
          </FormRow>
          <FormRow>
            <label className="text-dark-sec">Hasło</label>
            <input
              type="password"
              id="password"
              autocomplete="new-password"
              placeholder="••••••"
              className="bg-dark-darkbg border-dark-mainborder hover:border-dark-mainborderhover placeholder:text-dark-placeholder outline-blue rounded-lg border px-3 py-2 transition-all duration-300"
            />
          </FormRow>

          <div class="flex items-center gap-3">
            <input id="remember-me" type="checkbox" value="" />
            <label for="remember-me" className="text-dark-main">
              Zapamiętaj mnie
            </label>
          </div>

          <button className="bg-dark-main hover:bg-dark-mainhover outline-blue w-full rounded-lg py-3 font-medium transition-all duration-300">
            Zaloguj
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

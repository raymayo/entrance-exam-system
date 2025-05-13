import React from "react";

const AdminLogin = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-8 lg:justify-center">
      <div className="pattern flex h-full max-h-fit w-full max-w-xl flex-col gap-8 rounded-xl border border-zinc-200 p-1.5 text-center shadow-md">
        <form className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-6">
          <h1 className="text-2xl font-semibold">Admin Login</h1>
          <label className="flex flex-col gap-1.5 text-left">
            Username
            <input
              type="text"
              className="rounded-md border border-zinc-200 p-2 text-base shadow-2xs"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-left">
            Password
            <input
              type="password"
              className="rounded-md border border-zinc-200 p-2 text-base shadow-2xs"
            />
          </label>
          <button
            className="mt-6 cursor-pointer rounded-md border bg-zinc-900 p-2 text-sm font-medium text-zinc-100 hover:bg-zinc-800"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

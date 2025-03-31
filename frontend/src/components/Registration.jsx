import React from "react";

const Registration = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center border border-red-500">
      <form className="flex w-full max-w-xl flex-col gap-2 rounded-md border p-6 shadow-md">
        <h1 className="text-center text-xl font-medium">
          Register For Entrance Exam
        </h1>
        <label className="flex flex-col gap-1 text-left text-sm">
          Phone Number
          <input
            className="rounded-md border p-2 text-base"
            type="tel"
            name="phone"
            placeholder="09XXXXXXXXX"
            pattern="09[0-9]{9}"
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-left text-sm">
          Email
          <input
            className="rounded-md border p-2 text-base"
            type="email"
            name="email"
            placeholder="example@email.com"
            required
          />
        </label>
        <button className="mt-6 cursor-pointer rounded-md border bg-zinc-900 p-2 text-sm font-medium text-zinc-300">
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;

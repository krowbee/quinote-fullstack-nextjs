"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormInputs,
  RegisterSchema,
} from "../../../../lib/schemas/RegisterSchema";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/app/_store/useAuthStore";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "" },
  });

  const login = useAuthStore((state) => state.login);

  const handleForm = async (data: RegisterFormInputs) => {
    const response = await fetch("/api/auth/register", {
      body: JSON.stringify({ email: data.email, password: data.password }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const json = await response.json();

    if (!response.ok) {
      setError("root", { message: json.message });
      return;
    }
    login();
    redirect("/");
  };

  return (
    <div className="flex flex-col card justify-center items-center p-8 shadow-sm">
      <form
        className="flex flex-col justify-center items-center login-form form gap-2 text-sans"
        noValidate
        onSubmit={handleSubmit(handleForm)}
      >
        <h2 className="text-xl">Sign up</h2>
        <div className="flex w-full justify-between">
          <label htmlFor="email" className="text-md">
            Email
          </label>
          {errors.email && (
            <p className="text-sm text-error">{errors.email.message}</p>
          )}
        </div>
        <input
          id="email"
          type="email"
          className="ring-1 text-md rounded-sm ring-accent focus:outline-2 focus:outline-accent px-4 py-2"
          placeholder="example@mail.com"
          {...register("email")}
        ></input>
        <div className="flex w-full justify-between">
          <label htmlFor="password" className="text-md">
            Password
          </label>
          {errors.password && (
            <p className="text-sm text-error">{errors.password.message}</p>
          )}
        </div>
        <input
          id="password"
          type="password"
          className="ring-1 text-md rounded-sm ring-accent focus:outline-2 focus:outline-accent px-4 py-2"
          placeholder="password"
          {...register("password")}
        ></input>
        <button
          type="submit"
          className="btn btn-md w-full  text-white bg-accent transition duration-300 ease-in hover:scale-101 hover:bg-gradient-to-r hover:from-green-400 via-accent to-emerald-300"
        >
          Sign up
        </button>
        {errors.root && (
          <p className="text-sm text-error">{errors.root.message}</p>
        )}
      </form>
    </div>
  );
}

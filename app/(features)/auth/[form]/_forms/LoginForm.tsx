"use client";
import { useForm } from "react-hook-form";
import { LoginFormInputs, LoginSchema } from "@/shared/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/_store/useAuthStore";
import { loginUser } from "../../api/auth.client.api";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
    shouldFocusError: true,
  });
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleForm = async (data: LoginFormInputs) => {
    const result = await loginUser(data);

    if (!result.success) {
      setError("root", { message: result.message });
      return;
    }

    login(result.user);
    router.replace("/");
  };

  return (
    <div className="flex flex-col card justify-center items-center p-8 shadow-sm">
      <form
        className="flex flex-col justify-center items-center login-form form gap-2 text-sans"
        noValidate
        onSubmit={handleSubmit(handleForm)}
      >
        <h2 className="text-xl text-primary py-2">Sign in</h2>
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
          className="ring-1 text-md rounded-sm ring-primary focus:outline-2 focus:outline-primary px-4 py-2"
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
          className="ring-1 text-md rounded-sm ring-primary focus:outline-2 focus:outline-primary px-4 py-2"
          placeholder="password"
          {...register("password")}
        ></input>
        <button
          type="submit"
          className="btn btn-md w-full  text-white bg-primary transition duration-300 ease-in hover:scale-101 "
        >
          Sign in
        </button>
        {errors.root && (
          <p className="text-sm text-error">{errors.root.message}</p>
        )}
      </form>
    </div>
  );
}

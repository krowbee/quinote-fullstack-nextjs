"use client";
import { useAuthStore } from "@/app/_store/useAuthStore";
import { useForm } from "react-hook-form";
import { logoutUser } from "../../api/auth.client.api";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleForm = async () => {
    const result = await logoutUser();
    if (!result.success) {
      setError("root", { message: result.message });
      return;
    }

    logout();
    router.replace("/");
  };

  const {
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex flex-col card justify-center items-center p-8 shadow-sm">
      <h1 className="text-xl text-primary">Logout</h1>
      <form
        className="flex flex-col justify-center items-center login-form form gap-4 text-sans"
        noValidate
        onSubmit={handleSubmit(handleForm)}
      >
        <p className="text-md">Are you sure?</p>
        <button
          type="submit"
          className="btn btn-md w-full  text-white bg-error transition duration-300 ease-in hover:scale-101 hover:bg-gradient-to-r hover:from-red-400  to-red-600"
        >
          Logout
        </button>
        {errors.root && (
          <p className="text-sm text-error">{errors.root.message}</p>
        )}
      </form>
    </div>
  );
}

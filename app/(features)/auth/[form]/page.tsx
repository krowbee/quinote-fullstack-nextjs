import LoginForm from "./_forms/LoginForm";
import LogoutForm from "./_forms/LogoutForm";
import RegisterForm from "./_forms/RegisterForm";

export default async function AuthPage({
  params,
}: {
  params: { form: string };
}) {
  const { form } = await params;

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      {form === "login" ? (
        <LoginForm />
      ) : form === "register" ? (
        <RegisterForm />
      ) : form === "logout" ? (
        <LogoutForm />
      ) : (
        <p>Error</p>
      )}
    </div>
  );
}

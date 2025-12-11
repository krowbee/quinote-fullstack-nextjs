import { ReactNode } from "react";
import AuthClientProvider from "./AuthClientProvider";

export default async function AuthServerProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <AuthClientProvider>{children}</AuthClientProvider>;
}

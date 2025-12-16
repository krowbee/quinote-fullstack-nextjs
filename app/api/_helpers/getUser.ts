import { UnauthorizedException } from "@/lib/exceptions/httpExceptions/httpExceptions";
import { tokens } from "@/domains/auth/tokens/tokens";
import { cookies } from "next/headers";

export async function getUser() {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) throw new UnauthorizedException("Invalid access token");
  const user = tokens.verifyAccessToken(accessToken);
  return user;
}

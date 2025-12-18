import { tokens } from "@/domains/auth/tokens/tokens";
import { HaveNotAccessTokenError } from "@/lib/http/errors/http.errors";
import { cookies } from "next/headers";

export async function getUser() {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) throw new HaveNotAccessTokenError();
  const user = tokens.verifyAccessToken(accessToken);
  return user;
}

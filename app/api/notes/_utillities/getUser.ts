import { UnauthorizedException } from "@/lib/exceptions/httpExceptions/httpExceptions";
import { tokenService } from "@/lib/services/token.service";
import { cookies } from "next/headers";

export async function getUser() {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) throw new UnauthorizedException("Invalid access token");
  const user = tokenService.verifyAccessToken(accessToken);
  return user;
}

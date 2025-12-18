import { authService } from "@/domains/auth/services/auth.service";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  accessCookieOptions,
  refreshCookieOptions,
} from "../_constants/cookiesOptions";
import { mapErrorToResponse } from "@/lib/http/errorMapper";
import { HaveNotRefreshTokenError } from "@/lib/http/errors/http.errors";

export async function POST() {
  try {
    const cookie = await cookies();
    const reqRefreshToken = cookie.get("refreshToken")?.value;
    if (!reqRefreshToken) throw new HaveNotRefreshTokenError();

    const { accessToken, refreshToken } = await authService.refresh(
      reqRefreshToken
    );

    cookie.set("accessToken", accessToken, accessCookieOptions);
    cookie.set("refreshToken", refreshToken, refreshCookieOptions);

    return NextResponse.json(
      { message: "Tokens refreshed successful" },
      { status: 200 }
    );
  } catch (err) {
    return mapErrorToResponse(err);
  }
}

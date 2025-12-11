import { HttpException } from "@/lib/exceptions/HttpException";
import { UnauthorizedException } from "@/lib/exceptions/httpExceptions/httpExceptions";
import { authService } from "@/lib/services/auth.service";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  accessCookieOptions,
  refreshCookieOptions,
} from "../_authConsts/cookiesOptions";

export async function POST() {
  try {
    const cookie = await cookies();
    const reqRefreshToken = cookie.get("refreshToken")?.value;
    if (!reqRefreshToken)
      throw new UnauthorizedException("Invalid refresh token");

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
    if (err instanceof HttpException)
      return NextResponse.json(
        { message: err.message },
        { status: err.status }
      );
  }
  return NextResponse.json(
    { message: "Internal server error" },
    { status: 500 }
  );
}

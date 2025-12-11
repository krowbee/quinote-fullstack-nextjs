import { HttpException } from "@/lib/exceptions/HttpException";
import { LoginSchema } from "@/lib/schemas/LoginSchema";
import { authService } from "@/lib/services/auth.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  accessCookieOptions,
  refreshCookieOptions,
} from "../_authConsts/cookiesOptions";
import { BadRequestException } from "@/lib/exceptions/httpExceptions/httpExceptions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dataInvalidCheck = LoginSchema.safeParse(body);
    if (!dataInvalidCheck.success) throw new BadRequestException();

    const validData = LoginSchema.parse(body);

    const { accessToken, refreshToken, user } = await authService.login(
      validData.email,
      validData.password
    );

    const cookie = await cookies();
    cookie.set("refreshToken", refreshToken, refreshCookieOptions);
    cookie.set("accessToken", accessToken, accessCookieOptions);

    return NextResponse.json(
      { message: "Login succesfull", user },
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

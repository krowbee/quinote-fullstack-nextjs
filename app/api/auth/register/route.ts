import { HttpException } from "@/lib/exceptions/HttpException";
import { BadRequestException } from "@/lib/exceptions/httpExceptions/httpExceptions";
import { RegisterSchema } from "@/shared/schemas/RegisterSchema";
import { authService } from "@/domains/auth/services/auth.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  accessCookieOptions,
  refreshCookieOptions,
} from "../_constants/cookiesOptions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dataInvalidCheck = RegisterSchema.safeParse(body);
    if (!dataInvalidCheck.success) throw new BadRequestException();
    const validData = RegisterSchema.parse(body);
    const { accessToken, refreshToken, user } = await authService.register(
      validData.email,
      validData.password
    );

    const cookie = await cookies();

    cookie.set("refreshToken", refreshToken, refreshCookieOptions);
    cookie.set("accessToken", accessToken, accessCookieOptions);

    return NextResponse.json(
      { message: "User created successful", user },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof HttpException) {
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
}

import { LoginSchema } from "@/shared/schemas/LoginSchema";
import { authService } from "@/domains/auth/services/auth.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  accessCookieOptions,
  refreshCookieOptions,
} from "../_constants/cookiesOptions";
import { InvalidBodyDataError } from "@/lib/http/errors/http.errors";
import { mapErrorToResponse } from "@/lib/http/errorMapper";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dataInvalidCheck = LoginSchema.safeParse(body);
    if (!dataInvalidCheck.success) throw new InvalidBodyDataError();

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
    return mapErrorToResponse(err);
  }
}

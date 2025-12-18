import { RegisterSchema } from "@/shared/schemas/RegisterSchema";
import { authService } from "@/domains/auth/services/auth.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  accessCookieOptions,
  refreshCookieOptions,
} from "../_constants/cookiesOptions";
import { mapErrorToResponse } from "@/lib/http/errorMapper";
import { InvalidBodyDataError } from "@/lib/http/errors/http.errors";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dataInvalidCheck = RegisterSchema.safeParse(body);
    if (!dataInvalidCheck.success) throw new InvalidBodyDataError();
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
    return mapErrorToResponse(err);
  }
}

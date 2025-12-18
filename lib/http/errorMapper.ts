"use server";
import {
  InvalidCredentialsError,
  UserAlreadyExistsError,
} from "@/domains/auth/errors/auth.errors";
import { InvalidTokenError } from "@/domains/auth/tokens/token.errors";
import {
  HaveNotAccessError,
  InvalidRequestDataError,
} from "@/domains/notes/errors/notes.errors";
import { NextResponse } from "next/server";
import {
  HaveNotAccessTokenError,
  HaveNotRefreshTokenError,
} from "./errors/http.errors";

type ErrorMapItem = {
  status: number;
  message: string;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const errorMap = new Map<Function, ErrorMapItem>([
  [InvalidTokenError, { status: 401, message: "Invalid token error" }],
  [InvalidRequestDataError, { status: 403, message: "Invalid request data" }],
  [InvalidCredentialsError, { status: 401, message: "Invalid credentials" }],
  [
    HaveNotAccessError,
    { status: 401, message: "You haven't access to this resource" },
  ],
  [UserAlreadyExistsError, { status: 403, message: "User already exists" }],
  [HaveNotAccessTokenError, { status: 401, message: "Access token is empty" }],
  [
    HaveNotRefreshTokenError,
    { status: 401, message: "Refresh token is empty" },
  ],
]);

export async function mapErrorToResponse(err: unknown) {
  for (const [ErrorClass, config] of errorMap) {
    if (err instanceof ErrorClass) {
      return NextResponse.json(
        {
          message: config.message,
        },
        { status: config.status }
      );
    }
  }

  console.log(`UNHANDLED ERROR:${err}`);

  return NextResponse.json(
    { message: "Internal server error" },
    { status: 500 }
  );
}

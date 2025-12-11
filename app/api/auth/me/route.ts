import { getUser } from "../../notes/_utillities/getUser";
import { NextResponse } from "next/server";
import { HttpException } from "@/lib/exceptions/HttpException";

export async function GET() {
  try {
    const user = await getUser();
    return NextResponse.json({ user }, { status: 200 });
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

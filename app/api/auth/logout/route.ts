import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookie = await cookies();
  const header = req.headers.get("x-user-id");
  console.log(header);

  cookie.delete("accessToken");
  cookie.delete("refreshToken");

  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}

import { mapErrorToResponse } from "@/lib/http/errorMapper";
import { getUser } from "../../_helpers/getUser";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUser();
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    return mapErrorToResponse(err);
  }
}

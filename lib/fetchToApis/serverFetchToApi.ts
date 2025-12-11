"use server";
import { cookies } from "next/headers";

export async function serverFetchToApi(path: string) {
  const cookieStore = (await cookies()).toString();

  const res = await fetch(`${process.env.BASE_URL}${path}`, {
    headers: { Cookie: cookieStore },
    cache: "no-store",
  });
  return res;
}

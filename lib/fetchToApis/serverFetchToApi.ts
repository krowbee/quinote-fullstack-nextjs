"use server";
import { cookies } from "next/headers";

export async function serverFetchToApi(path: string) {
  const cookieStore = (await cookies()).toString();

  const res = await fetch(
    `https://${
      process.env.NODE_ENV === "production"
        ? process.env.VERCEL_URL
        : "localhost:3000"
    }${path}`,
    {
      headers: { Cookie: cookieStore },
      cache: "no-store",
    }
  );
  return res;
}

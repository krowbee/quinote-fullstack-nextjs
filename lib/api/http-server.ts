"use server";
import { cookies, headers } from "next/headers";

export async function getBaseUrl(): Promise<string> {
  const h = await headers();
  const host = h.get("host");
  return `${
    process.env.NODE_ENV === "production" ? "https://" : "http://"
  }${host}`;
}

export async function serverFetchToApi(path: string) {
  const cookieStore = (await cookies()).toString();
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}${path}`, {
    headers: { Cookie: cookieStore },
    cache: "no-store",
  });
  return res;
}

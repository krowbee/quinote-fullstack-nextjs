import { NextRequest, NextResponse } from "next/server";

type Rule = {
  match: string[];
  guestOnly?: boolean;
  authOnly?: boolean;
  redirectTo?: string;
};

const rules: Rule[] = [
  {
    match: ["/auth/login", "/auth/register"],
    guestOnly: true,
    redirectTo: "/notes",
  },
  {
    match: ["/auth/logout", "/notes"],
    authOnly: true,
    redirectTo: "/auth/login",
  },
];

const matchPrefix = (path: string, prefixes: string[]) => {
  return prefixes.some((p) => path === p || path.startsWith(p + "/"));
};

export async function proxy(req: NextRequest) {
  const isAuth = req.cookies.has("accessToken");
  const page = req.nextUrl.pathname;
  const rule = rules.find((rule) => matchPrefix(page, rule.match));
  if (!rule) return NextResponse.next();
  if (rule?.authOnly && !isAuth) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (rule?.guestOnly && isAuth) {
    return NextResponse.redirect(new URL("/notes", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};

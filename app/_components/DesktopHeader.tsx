"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { useAuthStore } from "../_store/useAuthStore";

export default function DesktopHeader(): ReactNode {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <header className="header top-0 left-0 z-50 fixed w-full backdrop-blur-md shadow-sm p-5">
      <div className="w-full flex justify-between align-center">
        <div className="logo flex justify-start items-center">
          <h2 className="text-3xl uppercase">
            <Link href="/">
              <span className="text-accent">QUI</span>NOTE
            </Link>
          </h2>
        </div>
        <div className="buttons flex justify-between gap-4">
          {!isAuth ? (
            <>
              <Link href="/auth/login">
                <button className="btn btn-md btn-soft-secondary">
                  Sign in
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="btn btn-md btn-accent">Sign up</button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/notes">
                <button className="btn btn-md btn-accent">Notes</button>
              </Link>
              <Link href="/auth/logout">
                <button className="btn btn-md btn-outline-primary">
                  Logout
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "../_store/useAuthStore";

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <div
      className={`flex flex-col fixed transition-all ease duration-300 ${
        isOpen ? "bg-white" : ""
      } z-50 w-full`}
    >
      <header className="w-full flex flex-col backdrop-blur-lg shadow-sm ">
        <div className="w-full flex justify-between p-4">
          <span className="text-3xl uppercase font-heading">
            <Link href="/">
              <span className="text-primary">QUI</span>NOTE
            </Link>
          </span>
          <button
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="btn btn-sm btn-primary flex-col"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={`h-1 w-6 bg-white transition ease-in-out ${
                isOpen && "rotate-45 translate-y-[5px]"
              }`}
            ></div>
            <div
              className={`h-1 w-6 bg-white transition ease-in-out ${
                isOpen && "opacity-0 absolute"
              }`}
            ></div>
            <div
              className={`h-1 w-6 bg-white transition ease-in-out ${
                isOpen && "rotate-[-45deg] translate-y-[-5px]"
              }`}
            ></div>
          </button>
        </div>
      </header>
      <div
        className={`nav-menu w-full bg-white flex shadow-sm flex-col transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "pointers-event-none opacity-0 -translate-y-1"
        }`}
      >
        <nav className="flex flex-col gap-2 items-center text-xl  p-2">
          {!isAuth ? (
            <>
              <Link href="/auth/login">Sign in</Link>
              <Link href="/auth/register">Sign up</Link>
            </>
          ) : (
            <>
              <Link href="/notes">Notes</Link>
              <Link href="/auth/logout">Logout</Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

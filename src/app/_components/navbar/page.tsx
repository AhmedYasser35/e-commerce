"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import logo from "../../../../assets/images/freshcart-logo.svg";
import Image from "next/image";
import { DropdownMenuIcons } from "../dropDown/page";
import { useQuery } from "@tanstack/react-query";
import { CartResponse } from "@/app/types/cart-response";

export default function Navbar() {
  const { data: cartData } = useQuery<CartResponse>({
    queryKey: ["get-cart"],
    queryFn: async () => {
      const resp = await fetch("/api/cart");
      const payload = await resp.json();
      return payload;
    },
  });

  const { status, data: session } = useSession();
  const [isOpen, setisOpen] = useState(false);
  const pathName = usePathname();

  function toggleNav() {
    setisOpen(!isOpen);
  }

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  const path = [
    { href: "/", content: "home" },
    { href: "/brands", content: "brands" },
    { href: "/categories", content: "categories" },
  ];

  const authPath = [
    { href: "/register", content: "register" },
    { href: "/login", content: "login" },
  ];
  if(!cartData){
    return
  }
  return (
    <nav className="bg-gray-200 w-full sticky top-0 z-50">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/">
          <Image
            className="cursor-pointer w-[120px] md:w-auto"
            alt="logo"
            src={logo}
          />
        </Link>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleNav}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Navigation Links Container */}
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:flex-1 md:justify-between md:items-center md:ml-10`}
        >
          {/* Main Links */}
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            {path.map((elem) => (
              <li key={elem.content}>
                <Link
                  href={elem.href}
                  className={`block py-2 px-3 rounded md:p-0 capitalize ${
                    pathName === elem.href
                      ? "text-green-600 font-bold"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {elem.content}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth & Utility Links */}
          <ul className="font-medium flex flex-col items-start md:items-center p-4 md:p-0 mt-4 md:flex-row md:space-x-6 md:mt-0 md:border-0">
            {status === "authenticated" ? (
              <>
                <li className="text-gray-700 py-2 md:py-0">
                  Hi, {session?.user?.name?.split(" ")[0]}
                </li>

                {/* Icons Group */}
                <div className="flex items-center space-x-5 py-2 md:py-0">
                  {/* Cart */}
                  <li className="relative">
                    <Link
                      href="/cart"
                      className="text-gray-700 hover:text-green-600"
                    >
                      {cartData?.numOfCartItems > 0 && (
                        <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full absolute -top-3 -right-3">
                          {cartData.numOfCartItems}
                        </span>
                      )}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </Link>
                  </li>

                  {/* Wishlist */}
                  <li>
                    <Link
                      href="/wishList"
                      className="text-gray-700 hover:text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 text-red-500"
                      >
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                      </svg>
                    </Link>
                  </li>

                  {/* Dropdown */}
                  <li>
                    <DropdownMenuIcons logout={logout} />
                  </li>
                </div>
              </>
            ) : (
              authPath.map((elem) => (
                <li key={elem.content}>
                  <Link
                    href={elem.href}
                    className={`block py-2 px-3 rounded md:p-0 capitalize ${
                      pathName === elem.href
                        ? "text-green-600 font-bold"
                        : "text-gray-700 hover:text-green-600"
                    }`}
                  >
                    {elem.content}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

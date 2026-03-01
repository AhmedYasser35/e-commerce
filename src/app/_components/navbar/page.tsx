'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

export default function Navbar() {
    const [isOpen, setisOpen] = useState(false)
    function toggleNav(){
      setisOpen(!isOpen)
    }
    const pathName=usePathname()
    const path = [
      { href: "/", content: "home" },
      { href: "/brands", content: "brands" },
      { href: "/products", content: "products" },
    ];
    const authPath = [
      { href: "/register", content: "register" },
      { href: "/login", content: "login" },
    ];
  return (
    <>
      <nav className="bg-gray-500  w-full ">
        <div className="max-w-7xl flex flex-wrap md:flex-nowrap gap-15 items-center justify-between mx-auto p-4">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
              Fresh Cart
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            onClick={toggleNav}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
          <div className={`${isOpen && "hidden"} w-full md:flex justify-between `} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              {path.map((elem) => {
                return (
                  <li key={elem.content}>
                    <Link
                      href={elem.href}
                      className={`${pathName==elem.href && 'active '}block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent`}
                    >
                      {elem.content}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              {authPath.map((elem) => {
                return (
                  <li key={elem.content}>
                    <Link
                      href={elem.href}
                      className={`${pathName == elem.href && "active "}block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent`}
                    >
                      {elem.content}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

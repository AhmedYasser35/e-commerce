'use client'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import logo from '../../../../assets/images/freshcart-logo.svg'
import Image from 'next/image';
import { DropdownMenuIcons } from '../dropDown/page';
import { useQuery } from '@tanstack/react-query';
import { CartResponse } from '@/app/types/cart-response';
export default function Navbar() {
  const {data:cartData,isLoading,isError}=useQuery<CartResponse>({
    queryKey:['get-cart'],
    queryFn:async ()=>{
      const resp = await fetch('/api/cart')
      const payload = await resp.json()
      return payload
    }
  })

    const {status,data:session}=useSession()
    console.log(status)
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
    function logout(){
      signOut({
        callbackUrl:'/login'
      })
    }
  return (
    <>
      <nav className="bg-gray-200  w-full ">
        <div className="max-w-7xl flex flex-wrap md:flex-nowrap gap-15 items-center justify-between mx-auto p-4">
          <Image className="cursor-pointer" alt="logo" src={logo} />
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
          <div
            className={`${isOpen && "hidden"} w-full md:flex justify-between `}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              {path.map((elem) => {
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
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              {status == "authenticated" ? (
                <>
                  <li>hi, {session?.user?.name}</li>
                  <li className="relative">
                    <Link href={"/cart"}>
                      <span className="bg-green-400 rounded-full text-white p-1 absolute -top-6">
                        {cartData?.numOfCartItems}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <DropdownMenuIcons logout={logout} />
                  </li>
                </>
              ) : (
                <>
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
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-start justify-between pr-2 h-screen py-4">
      <div className="flex flex-col items-start gap-4">
        <Link href="/">
          <FaXTwitter className="w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200" />
        </Link>
        <div className="flex flex-col items-start gap-3 font-bold">
          <Link
            href="/"
            className="flex items-center cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit"
          >
            <HiHome className="w-8 h-8" />
            <span className="hidden xl:inline">Home</span>
          </Link>

          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-blue-400  flex justify-center items-center rounded-2xl my-2 w-48 h-9 hover:brightness-95 transition-all duration-200 shadow-md hidden xl:inline"
            >
              <span className="text-white">Sign out</span>
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-blue-400  justify-center items-center rounded-2xl my-2 w-48 h-9 hover:brightness-95 transition-all duration-200 shadow-md hidden xl:inline"
            >
              <span className="text-white">Sign in</span>
            </button>
          )}
        </div>
      </div>
      {session && (
        <div className="flex items-center gap-2 xl:hover:bg-gray-100">
          <img
            className="rounded-full aspect-square w-12 ml-2"
            src={session.user.image}
            alt="user-img"
          />
          <div className="hidden xl:inline">
            <h6 className="font-bold text-sm">{session.user.name}</h6>
            <p className="text-gray-400 text-xs">@{session.user.username}</p>
          </div>
          <span className="hidden xl:inline pl-2">
            <BsThreeDots />
          </span>
        </div>
      )}
    </div>
  );
}

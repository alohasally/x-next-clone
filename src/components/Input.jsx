"use client";

import { useSession } from "next-auth/react";
import { HiOutlinePhotograph } from "react-icons/hi";

const Input = () => {
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <div className="w-full flex gap-4 p-2 border-b">
      <img
        src={session.user.image}
        alt="user-img"
        className="h-11 w-11 rounded-full cursur-pointer hover:brightness-95"
      />
      <div className="w-full space-y-2">
        <textarea
          placeholder="What's happening?"
          rows="2"
          className="resize-y p-2 border-b w-full placeholder-gray-400 placeholder:text-xl placeholder:font-semibold"
        ></textarea>
        <div className="flex justify-between">
          <HiOutlinePhotograph />
          <button className="bg-blue-300 px-2 py-1 text-white font-bold rounded-xl">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;

"use client";

import { HiOutlineChat, HiOutlineHeart, HiOutlineTrash } from "react-icons/hi";

function Icons() {
  return (
    <>
      <div className="flex items-center space-x-4 text-gray-500">
        <div className="flex items-center gap-1">
          <HiOutlineChat className="h-8 w-8 rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100 cursor-pointer" />
          <span>1</span>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineHeart className="h-8 w-8 rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100 cursor-pointer" />
          <span>1</span>
        </div>
        <HiOutlineTrash className="h-8 w-8 rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100 cursor-pointer" />
      </div>
    </>
  );
}

export default Icons;

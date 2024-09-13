"use client";

import { HiDotsHorizontal } from "react-icons/hi";

export default function Comment({ comment, id }) {
  return (
    <div className="flex py-4 px-2 border-b border-gray-200 hover:bg-gray-200 pl-10">
      <img
        src={comment?.userImg}
        alt="user-img"
        className="h-8 w-8 rounded-full mr-4"
      />
      <div className="flex-1 flex-col justify-start gap-2">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-1 whitespace-nowrap">
            <h4 className="text-sm font-bold truncate ">{comment?.name}</h4>
            <h6 className="text-xs font-light truncate">
              @{comment?.username}
            </h6>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>

        <p className="text-gray-800 text-xs my-3">{comment?.comment}</p>
      </div>
    </div>
  );
}

import Link from "next/link";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import Icons from "./Icons";

function Post({ post, id }) {
  return (
    <div className="flex py-4 px-2 border-b border-gray-200 hover:bg-gray-200">
      <img
        src={post?.data.profileimg}
        alt="user-img"
        className="h-8 w-8 rounded-full mr-4"
      />
      <div className="flex-1 flex-col justify-start gap-2">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-1 whitespace-nowrap">
            <h4 className="text-sm font-bold truncate ">
              {post?.data.username}
            </h4>
            <h6 className="text-sm font-light truncate">
              @{post.data.username}
            </h6>
          </div>
          <BsThreeDots />
        </div>
        <Link href={`/posts/${id}`}>
          <p className="text-gray-800 text-sm my-3">{post.data.text}</p>
        </Link>
        <Link href={`/posts/${id}`}>
          <img
            src={post.data.image}
            className="max-w-[500px] object-cover w-full max-h-full mb-4 rounded-xl"
          />
        </Link>
        <Icons id={id} />
      </div>
    </div>
  );
}

export default Post;

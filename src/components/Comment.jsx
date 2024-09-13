"use client";

import {
  collection,
  deleteDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from "react-icons/hi";
import { app } from "../firebase";
import { signIn, useSession } from "next-auth/react";

export default function Comment({ comment, commentId, originalPostId }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const db = getFirestore(app);
  const { data: session } = useSession();

  const handleLike = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user?.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session.user.uid
          ),
          {
            username: session.user.username,
            timestamp: serverTimestamp(),
          }
        );
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
  }, [db]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

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
        <div className="flex items-center">
          {isLiked ? (
            <HiHeart
              onClick={handleLike}
              className="h-8 w-8 rounded-full transition duration-500 ease-in-out p-2 text-red-500 hover:text-red-500 hover:bg-red-100 cursor-pointer"
            />
          ) : (
            <HiOutlineHeart
              onClick={handleLike}
              className="h-8 w-8 rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100 cursor-pointer"
            />
          )}
          {likes.length > 0 && (
            <span className={`text-xs ${isLiekd && "text-red-600"}`}>
              {likes.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

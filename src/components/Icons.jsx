"use client";

import { useSession, signIn } from "next-auth/react";
import { app } from "../firebase";
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
  collection,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";

import {
  HiHeart,
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
} from "react-icons/hi";
import { useEffect, useState } from "react";

function Icons({ id, uid }) {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  const handleLike = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
          username: session.user.username,
          timestamp: serverTimestamp(),
        });
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      if (session?.user?.uid === uid) {
        deleteDoc(doc(db, "posts", id))
          .then(() => {
            console.log("Document successfully deleted!");
            location.reload();
          })
          .catch((error) => {
            console.error("Error removing document : ", error);
          });
      } else {
        alert("You are not allowed to delete this post");
      }
    }
  };

  return (
    <div className="flex items-center space-x-4 text-gray-500">
      <div className="flex items-center gap-1">
        <HiOutlineChat className="h-8 w-8 rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100 cursor-pointer" />
        <span className={`${isLiked ? "text-blue-500" : ""} text-xs`}>1</span>
      </div>
      <div className="flex items-center gap-1">
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

        <span className={`${isLiked ? "text-red-500" : ""} text-xs`}>
          {likes.length > 0 && likes.length}
        </span>
      </div>
      {session?.user?.uid === uid && (
        <HiOutlineTrash
          onClick={handleDeletePost}
          className="h-8 w-8 rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100 cursor-pointer"
        />
      )}
    </div>
  );
}

export default Icons;

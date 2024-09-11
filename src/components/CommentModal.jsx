"use client";

import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";
import Modal from "react-modal";
import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
const { useSession } = require("next-auth/react");
import { app } from "../firebase";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [input, setInput] = useState("");
  const [post, setPost] = useState({});
  const { data: session } = useSession();
  const db = getFirestore(app);

  useEffect(() => {
    if (postId !== "") {
      const postRef = doc(db, "posts", postId);
      const unsubscribe = onSnapshot(postRef, (snapshot) => {
        if (snapshot.exists()) {
          setPost(snapshot.data());
        } else {
          console.log("No such document!");
        }
      });
      return () => unsubscribe();
    }
  }, [postId]);

  const sendComment = async () => {};
  console.log("post", post);
  return (
    <>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          ariaHideApp={false}
          className="max-w-lg w-[90%] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white border-gray-200 rounded-xl shadow-md"
        >
          <div className="p-4">
            <div className="border-b border-gray-200 py-2 px-1.5" clas>
              <HiX
                className="text-2xl text-gray-700 p-1 hover:bg-gray-200 rounded-full cursor-pointer"
                onClick={() => setOpen(false)}
              ></HiX>
            </div>
            <div className="p-2 flex items-center sapce-x-1 relative">
              <span className="w-0.5 h-full z-[-1] absoulte left-8 top-11 bg-gray-300" />
              <img
                src={post?.profileImg}
                alt="user-img"
                className="h-11 w-11 rounded-full mr-4"
              />
              <h4 className="font-bold sm:text-[16px] text-[15px] hover:underline truncate  ">
                {post?.name}
              </h4>
              <span className="text-sm sm:text-[15px] truncate">
                @{post?.username}
              </span>
            </div>
            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 m-2 "></p>
            <div className="flex p-3 space-x-3">
              <img
                src={session.user.image}
                alt="user-img"
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
              />
              <div className="w-full divide-y divide-gray-200 ">
                <div>
                  <textarea
                    value=""
                    placeholder="Write a comment..."
                    className="w-full border-none outline-none tracking-wide min-h-[50px] placeholder-gray-400 placeholder:text-xl placeholder:font-semibold"
                  ></textarea>
                </div>
                <div className="flex items-center justify-end pt-2.5">
                  <button
                    className="w-full text-white bg-blue-400 py-2 px-4 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                    disabled={input.trim() === ""}
                    onClick={sendComment}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

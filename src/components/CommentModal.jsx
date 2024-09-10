"use client";

import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <>
      {open && (
        <div className="bg-white max-w-[600px] h-40">
          <h1>The modal is open</h1>
        </div>
      )}
    </>
  );
}

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";

import { app } from "../firebase";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Input = () => {
  const { data: session } = useSession();
  const imageInputRef = useRef(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      console.log(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (selectedFile) {
      setImageUploading(true);
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const uploadImageToStorage = () => {
    setImageUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        if (snapshot.state === "success") {
          console.log("Upload succeeded");
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setImageFileUrl(downloadURL);
            setImageUploading(false);
          });
        }
      },
      (error) => {
        console.error("Upload failed", error);
        setImageUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      }
    );
  };

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
        {imageFileUrl && (
          <img
            src={imageFileUrl}
            alt="image file"
            className="w-full max-h-[250px] object-cover cursor-pointer"
          />
        )}
        <div className="flex items-center justify-between">
          <HiOutlinePhotograph
            className="h-10 w-10 p-2 cursor-pointer text-sky-500 hover:brightness-95 hover:bg-sky-200 transition duration-200 rounded-full "
            onClick={() => imageInputRef.current.click()}
          />
          <input
            type="file"
            ref={imageInputRef}
            accept="image/*"
            className="hidden"
            onChange={addImageToPost}
          />
          <button className="bg-blue-300 px-2 py-1 text-white font-bold rounded-xl">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;

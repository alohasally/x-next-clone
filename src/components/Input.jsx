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

import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

const Input = () => {
  const { data: session } = useSession();
  const imageInputRef = useRef(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [text, setText] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const db = getFirestore(app);

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
      },
      (error) => {
        console.error("Upload failed", error);
        setImageUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageUploading(false);
        });
      }
    );
  };

  const handleSubmit = async () => {
    setPostLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      uid: session.user.uid,
      username: session.user.username,
      profileimg: session.user.image,
      text: text,
      image: imageFileUrl,
      timestamp: serverTimestamp(),
    });
    setPostLoading(false);
    setText("");
    setSelectedFile(null);
    setImageFileUrl(null);
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
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening?"
          rows="2"
          className="resize-y p-2 border-b w-full placeholder-gray-400 placeholder:text-xl placeholder:font-semibold"
        ></textarea>
        {imageFileUrl && (
          <img
            src={imageFileUrl}
            alt="image file"
            className={`w-full max-h-[250px] object-cover cursor-pointer ${
              imageUploading ? "animate-pulse" : ""
            }`}
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
          <button
            disabled={text.trim() === "" || imageUploading || postLoading}
            onClick={handleSubmit}
            className="bg-blue-400 px-2 py-1 text-white font-bold rounded-xl disabled:bg-blue-300"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;

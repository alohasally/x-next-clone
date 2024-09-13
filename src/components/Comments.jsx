"use client";

import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import Comment from "./Comment";

export default function Comments({ id }) {
  const db = getFirestore(app);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
        console.log("snapshot", snapshot.docs);
      }
    );
  }, [db, id]);

  return (
    <div>
      {comments.map((comment) => {
        return (
          <Comment key={comment.id} comment={comment.data()} id={comment.id} />
        );
      })}
    </div>
  );
}

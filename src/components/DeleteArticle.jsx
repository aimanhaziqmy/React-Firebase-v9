import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db, storage } from "../firebaseConfig";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";

export default function DeleteArticle({ id, imageUrl }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure wat to delete this artice ?")) {
      try {
        await deleteDoc(doc(db, "Articles", id));
        toast("Article deleted successfully", { type: "success" });
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
      } catch (err) {
        toast("Error deleting article", { type: "error" });
      }
    }
  };
  const handleCancel = () => {};
  return (
    <div>
      <i
        className="fa fa-times"
        style={{ cursor: "pointer" }}
        onClick={handleDelete}
      ></i>
    </div>
  );
}

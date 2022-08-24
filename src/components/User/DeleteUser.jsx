import {deleteDoc, doc} from "firebase/firestore";
import React from "react";
import {db} from "../../firebaseConfig";
import {toast} from "react-toastify";

export default function DeleteUser({id}) {
    const handleDelete = async () => {
        if (window.confirm("Are you sure wat to delete this user ?")) {
            try {
                await deleteDoc(doc(db, "Staff", id));
                toast("User deleted successfully", {type: "success"});
              
            } catch (err) {
                toast("Error deleting user", {type: "error"});
            }
        }
    };
    return (
        <div>
            <i className="fa fa-times" style={{cursor: "pointer"}} onClick={handleDelete}></i>
        </div>
    );
}
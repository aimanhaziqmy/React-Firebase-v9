import React, { useState } from "react";
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,db } from "../../firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: name });
      addAdmin(name,email)
      
    } catch (err) {
      toast(err.code, { type: "error" });
    }
  };

  const addAdmin = async (name,email) => {
    const adminRef = collection(db, "Admins");
    addDoc(adminRef, {
      name : name,
      email : email,
      createdAt : Timestamp.now().toDate()
    }).then(() => {
      toast("Admin added successfully", { type: "success" });
    }).catch((err) => {
      toast("Error adding user to database", { type: "error" });
    })
    
  }
  return (
    <div className="border p-3 bg-light" style={{ marginTop: 100 }}>
      <h1>Add Admin</h1>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Name</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSignup}>
        Submit form
      </button>
    </div>
  );
};

export default Register;

import React, {useState} from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import {toast} from "react-toastify"
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

export default function AddUser(){
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    imanId: "",
    createdAt : Timestamp.now().toDate()
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = (e) => {
    if(!formData.name || !formData.email || !formData.imanId){
      alert("Please fill all the fields");
      return;
    }

    const userRef = collection(db, 'Staff');
    addDoc(userRef, {
      name: formData.name,
      email: formData.email,
      imanId: formData.imanId,
      createdAt: formData.createdAt
    }).then(() => {
      toast("User added successfully", {type : "success"});
    }).catch((err) => {
      toast("Error adding user", {type : "error"});
    })

  }

  return (
    <div className="border card p-3 mt-3" style={{position :"fixed"}}>
      <h2 className="text-center">Add User</h2>
      <div className="form-group">
        <label htmlFor="">Name</label>
        <input type="text" name="name" className="form-control" value={formData.name} onChange={(e) => handleChange(e)}/>
      </div>

      {/* email */}
      <div className="form-group">
        <label htmlFor="">Email</label>
        <input type="text" name="email" className="form-control" value={formData.email} onChange={(e) => handleChange(e)}/>
      </div>

      {/* Iman ID */}
      <div className="form-group">
        <label htmlFor="">Iman ID</label>
        <input type="text" name="imanId" className="form-control" value={formData.imanId} onChange={(e) => handleChange(e)}/>
      </div>

      <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Add User</button>
    </div>
  )
}

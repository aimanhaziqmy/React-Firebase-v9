import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import DeleteUser from './DeleteUser';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const userRef = collection(db, 'Staff');
    const q = query(userRef, orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(users);
    });
  })

  return (
    <div class="container">
      {users.length === 0 ? (
        <div>
          <p className="mt-5">No users found</p>
        </div>
      ) : (
        <div>
          <table class="table caption-top">
            <caption>IMAN Staff</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">IMAN ID</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {users.map((user,i) => (
                <tr key={user.id}>
                  <th scope="row">{i+1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.imanId}</td>
                  <td><DeleteUser id={user.id}/></td>
                </tr>   
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
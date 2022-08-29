import React, { useEffect, useState } from 'react'
import { orderBy, collection, query, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";


export default function Admins() {
    const [admins, setAdmins] = useState([]);
    useEffect(() => {
        const adminsRef = collection(db, 'Admins');
        const q = query(adminsRef, orderBy('createdAt', 'desc'));
        onSnapshot(q, (snapshot) => {
            const admins = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAdmins(admins);
        })
    })

    return (
        <div>
            {admins.length === 0 ? (
                <p>No Admins is here</p>
            ) : (
                <div>
                    <table className="table caption-top">
                        <caption>Admins</caption>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                        {admins.map((admin,i) => (
                                    <tr key={admin.id}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{admin.createdAt?.toDate().toDateString()}</td>
                                        <td>{admin.name}</td>
                                        <td>{admin.email}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            )}
        </div>
    )
}
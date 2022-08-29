import {
    arrayRemove,
    arrayUnion,
    doc,
    onSnapshot,
    updateDoc,
  } from "firebase/firestore";
  import React, { useEffect, useState } from "react";
  import { db } from "../../firebaseConfig";
  import { useAuthState } from "react-firebase-hooks/auth";
  import { v4 as uuidv4 } from "uuid";
  
  export default function Clockin({ id }) {1
    const [clockIn, setClockIn] = useState("");
    const [clockIns, setClockIns] = useState([]);
    const clockInRef = doc(db, "Events", id);
    useEffect(() => {
      const docRef = doc(db, "Events", id);
      onSnapshot(docRef, (snapshot) => {
        setClockIns(snapshot.data().clockIns);
      });
    }, []);
  
    const handleChangeClockIn = (e) => {
      if (e.key === "Enter") {
        updateDoc(clockInRef, {
          clockIns: arrayUnion({
            staff: staffName,
            date : workDate,
            clockIn: clockIn,
            clockOut: clockOut,
            salary : salary,
            createdAt: new Date(),
            clockInId: uuidv4(),
          }),
        }).then(() => {
          setClockIn("");
        });
      }
    };
  
    // delete clock in function
    const handleDeleteClockIn = (clockIn) => {
      console.log(clockIn);
      updateDoc(clockInRef, {
        clockIns: arrayRemove(clockIn),
      })
        .then((e) => {
          console.log(e);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return (
      <div>
        Clock In
        <div className="container">
          {clockIns !== null &&
            clockIns.map(({ clockInId, user, clockIn, userName, createdAt }) => (
              <div key={clockInId}>
                <div className="border p-2 mt-2 row">
                  <div className="col-11">
                    <span
                      className={`badge ${
                        user === currentlyLoggedinUser.uid
                          ? "bg-success"
                          : "bg-primary"
                      }`}
                    >
                      {userName}
                    </span>
                    {clockIn}
                  </div>
                  <div className="col-1">
                    {user === currentlyLoggedinUser.uid && (
                      <i
                        className="fa fa-times"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleDeleteClockIn({
                            clockInId,
                            user,
                            clockIn,
                            userName,
                            createdAt,
                          })
                        }
                      ></i>
                    )}
                  </div>
                </div>
              </div>
            ))}
          {currentlyLoggedinUser && (
            <input
              type="text"
              className="form-control mt-4 mb-5"
              value={clockIn}
              onChange={(e) => {
                setClockIn(e.target.value);
              }}
              placeholder="Add a clock In"
              onKeyUp={(e) => {
                handleChangeClockIn(e);
              }}
            />
          )}
        </div>
      </div>
    );
  }
  
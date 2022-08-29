import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const eventsRef = collection(db, "Events");
    const q = query(eventsRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const events = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(events);
    });
  });
  
  return (
    <div>
      {events.length === 0 ? (
       <p>No events</p>
      ) : (
        events.map((event) => (
          <div key={event.id}  className="card mt-3">
          <div className="card-header">
            <h3 className="card-title text-center">{event.title}</h3>
            <p className="text-center">From {event.datestart?.toDate().toDateString()} until {event.dateend?.toDate().toDateString()}</p>
          </div>
          <div className="card-body">
            <label for="staffId">Staff ID</label>
            <input type="text" id="staffId" placeholder="IM0000" className="form-control" />
            <label for="date">Date</label>
            <input type="date" id="date" placeholder="2022" className="form-control" />
            <div className="row">
              <div className="col-6">
                <label for="fromTime">From (time)</label>
                <input type="time" id="fromTime" className="form-control" />
              </div>
              <div className="col-6">
                <label for="toTime">To (time)</label>
                <input type="time" id="toTime" className="form-control" />
              </div>
            </div>
           <label for="salary">Salary</label>
           <input type="text" id="salary" className="form-control" />
           <div className="d-grid mt-2">
           <button className="btn btn-primary">Submit</button>
            </div>
     
          </div>
        </div>
        ))
      )}
    </div>
  );
}

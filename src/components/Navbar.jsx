import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import ImanMediaImg from '../images/imanmedianav.png'
const Navbar = () => {
  const [user] = useAuthState(auth);
  return (
    <div
      className="fixed-top"
    >
      <nav className="navbar navbar-light bg-light">
      <div className="row container-fluid">
        <div className="col-auto">
          <img
            src={ImanMediaImg}
            height={50}
            alt="logo"
            className="ms-2"
          />
      </div>
      <div className="col-auto">
          <Link className="nav-link" to="/">
          Home
        </Link>
        </div>
        <div className="col-auto">
         
          <Link className="nav-link" to="/register">
          Register
        </Link>
        </div>
        </div>
        
       
        {user && (
          <>
            <span className="pe-4">Signed in as {user.displayName}</span>
            <button
              className="btn btn-primary btn-sm me-3"
              onClick={() => {
                signOut(auth);
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

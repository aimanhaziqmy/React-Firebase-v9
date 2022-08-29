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
        <div className=" container-fluid">
          <div className="col-auto">
            <img
              src={ImanMediaImg}
              height={50}
              alt="logo"
              className="ms-2"
            />
          </div>
          <div className="row d-flex align-items-center m-2">
            <div className="col-auto">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </div>


            {user && (
              <>
                <div className="col-auto">
                  <Link className="nav-link" to="/register">
                    Add Admin
                  </Link>
                </div>
                <div className="col-auto">
                  <Link className="nav-link" to="/allevents">All Events</Link>
                </div>
                <div className="col-auto">
                  <Link className="nav-link" to="/users">Staff</Link>
                </div>
                <div className="col-auto">
                  <span className="pe-4">Signed in as {user.displayName}</span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      signOut(auth);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

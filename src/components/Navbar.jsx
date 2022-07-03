import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
const Navbar = () => {
  const [user] = useAuthState(auth);
  return (
    <div
      className="fixed-top border pt-3 pb-3"
      style={{ backgroundColor: "whitesmoke" }}
    >
      <nav className="navbar">
        <div>
          <img
            src="https://picsum.photos/300/300"
            width={30}
            height={30}
            alt="logo"
            className="ms-5"
          />
        </div>
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/register">
          Register
        </Link>

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

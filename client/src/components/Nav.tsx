import React from "react";
import { Link } from "react-router-dom";
import User from "./UserClass";

type NavProps = {
  user: User | undefined;
  logout: Function;
};
var logoutFN: Function = () => {};
export default function Nav({ user, logout }: NavProps) {
  return (
    <nav className="Nav">
      <ul className="Nav__links">
        {(logoutFN = logout)}
        <li>
          <Link to="/" className="Nav__link__tittle">
            Video Storage
          </Link>
        </li>
        {user ? (
          <AddLoginIcons user={user} logout={logout} />
        ) : (
          <li className="Nav__link-push">
            <Link to="/singup" className="Nav__link">
              <p>Upload video</p>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

function getUserData(e: any) {
  e.preventDefault();
  logoutFN();
}

function AddLoginIcons({ user, logout }: NavProps) {
  return (
    <>
      <li className="Nav__link-push">
        <button>
          <Link to="/upload" className="Nav__link">
            <p>Upload video</p>
          </Link>
        </button>
      </li>
      <li className="Nav__link-margin-left">
        <button>
          <Link to="/myvideos" className="Nav__link">
            <p>My Videos</p>
          </Link>
        </button>
      </li>
      <li className="Nav__link-margin-left">
        <button onClick={getUserData}>
          <Link to="/" className="Nav__link__LogOut">
            <p>Logout</p>
          </Link>
        </button>
      </li>
    </>
  );
}
/*<li className="Nav__link-margin-left">
        <button onClick={getUserData}>
          <Link to="/" className="Nav__link__LogOut"> <p>My Videos</p></Link>
        </button>
      </li>*/

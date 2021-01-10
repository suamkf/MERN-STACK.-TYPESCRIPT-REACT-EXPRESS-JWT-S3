import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Main from "../components/Main";
import logger from "../utils/logger";
import User from "../components/UserClass";

type singUpProps = {
  login: Function;
};

export default function Signup({ login }: singUpProps) {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: "",
    _id: undefined,
  });

  function getUserData(e: any) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  let historys = useHistory();
  function redirect(path: string) {
    historys.push(path);
  }
  async function sendDataToServer(e: any) {
    e.preventDefault();

    try {
      await login(user);
      redirect("/");
    } catch (err) {
      logger.error(err);
    }
  }

  return (
    <Main center={true}>
      <div className="Signup">
        <div className="FormContainer">
          <h1 className="Form__titulo">Video Storage</h1>
          <p className="FormContainer__info">Login to stoges your own videos</p>
          <form onSubmit={sendDataToServer}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="Form__field"
              required
              onChange={getUserData}
              value={user.email}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="Form__field"
              required
              onChange={getUserData}
              value={user.password}
            />
            <button className="Form__submit" type="submit">
              Login
            </button>
            <p className="FormContainer__info">
              You do not have an account? <Link to="/">Sing up</Link>
            </p>
          </form>
        </div>
      </div>
    </Main>
  );
}

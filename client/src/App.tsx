import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import Axios from "axios";

import {
  setToken,
  deletToken,
  initAxiosInterceptors,
  getToken,
} from "./helper/auth";
import Nav from "./components/Nav";
import Signup from "./views/Singup";
import Login from "./views/Login";
import User from "./components/UserClass";
import logger from "./utils/logger";
import Upload from "./views/Upload";
import Videos from "./views/Videos";
import Videos2 from "./views/Videos2";

initAxiosInterceptors();

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    (async function loadingUserInfo() {
      try {
        const { data } = await Axios.get("/api/users/whoami");

        const newUser = new User(
          data.user.username,
          data.user.email,
          undefined,
          data.user._id
        );
        setUser(newUser);
      } catch (error) {
        logger.error(error);
      }
    })();
  }, []);

  return (
    <Router>
      <Nav user={user || undefined} logout={logout} />

      {user ? (
        <LoginRoutes login={login} user={user} />
      ) : (
        <LogUtRoutes singUp={singUp} login={login} />
      )}
    </Router>
  );

  async function singUp(user: User) {
    const username = user.username;
    const email = user.email;
    const password = user.password;
    const { data } = await Axios.post("/api/users/singup", {
      username,
      email,
      password,
    });
    const newUser: User = data.user;

    setToken(data.token);
  }

  async function login(user: User) {
    const password = user.password;
    const email = user.email;
    const { data } = await Axios.post("/api/users/login", {
      email,
      password,
    });
    const newUser: User = data.user;

    setUser(new User(newUser.username, newUser.email, undefined, newUser._id));
    setToken(data.token);
  }

  function logout() {
    deletToken();
    window.location.reload(false);
  }
}
type singUpProps = {
  singUp: Function;
  login: Function;
};

type LoginProps = {
  login: Function;
  user: User;
};

function LoginRoutes({ user, login }: LoginProps) {
  return (
    <Switch>
      <Route path="/upload" render={(props) => <Upload upload={true} />} />
      <Route path="/myvideos" render={(props) => <Videos />} />
      <Route exact path="/" render={(props) => <Videos2 />} ></Route>
      <Route
        path="/:id"
        render={(props) => <Upload upload={false} />}
      />
    </Switch>
  );
}
function LogUtRoutes({ singUp, login }: singUpProps) {
  return (
    <Switch>
      <Route exact path="/login" render={(props) => <Login login={login} />} />
      <Route exact path="/" render={(props) => <Videos2 />} />
      <Route
        exact
        path="/singup"
        render={(props) => <Signup singUp={singUp} />}
      />
    </Switch>
  );
}

type UserLoginProps = {
  user: User;
};

export default App;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
import { Button } from "@material-ui/core";

function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
  };
  return (
    <Router history={history}>
      <div>
        {currentUser ? (
          <div>
            <h1>Welcome!</h1>
            <Button
              onClick={() => {
                logOut();
              }}
            >
              LOGOUT
            </Button>
          </div>
        ) : (
          <h1>
            Login
            <Link href="/login">HERE</Link>
          </h1>
        )}
        <div className="container">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

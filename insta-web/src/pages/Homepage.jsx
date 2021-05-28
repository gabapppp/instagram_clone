import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AppBarHeader from "../components/appbar";
import Login from "./Login";
import { logout } from "../actions/auth";
import Link from "@material-ui/core/Link";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Button } from "@material-ui/core";

function HomePage(props) {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = props.currentUser;
    if (user) {
      setCurrentUser(user);
    }
  }, [props.currentUser]);
  const logOut = () => (props) => {
    props.dispatch(logout(currentUser));
  };

  return (
    <BrowserRouter>
      <div>
        <AppBarHeader />
        <h2>This is HomePage</h2>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">{currentUser.username}</li>
            <li className="nav-item">
              <Button onClick={logOut}>Log Out</Button>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <Link href="/login">Login</Link>
          </div>
        )}
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

function mapStateToProps(currentUser) {
  const { user } = currentUser;
  return {
    user,
  };
}

export default connect(mapStateToProps)(HomePage);

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PostDetails from "./pages/PostDetail";
import Header from "./components/common/AppBar";

import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
  return (
    <Router history={history}>
      <div className="App">
        {currentUser ? <Header /> : <Redirect to="/login" />}
        <div className="container">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/:username" component={Profile} />
            <Route exact path="/post/:pk" component={PostDetails} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

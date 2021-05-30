import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import UserService from "../services/user.service";
const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState("");

  useEffect(() => {
    async function fetchData() {
      await UserService.getMyProfile()
        .then((response) => {
          console.log(response.data);
          setProfile(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{profile.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.access} ...{" "}
        {currentUser.access.substr(currentUser.access.length - 20)}
      </p>
      <p>
        <strong>Name:</strong> {profile.first_name} {profile.last_name}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
    </div>
  );
};

export default Profile;

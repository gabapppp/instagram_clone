import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import UserService from "../services/user.service";
import Info from "../components/Profile/info";
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
    <div style={{ marginTop: "90px" }}>
      <Info data={profile} />
    </div>
  );
};

export default Profile;

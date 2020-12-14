import React from "react";
import { authService } from "myFirebase";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const onClickLogOut = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onClickLogOut}>LOGOUT</button>
    </>
  );
};

export default Profile;

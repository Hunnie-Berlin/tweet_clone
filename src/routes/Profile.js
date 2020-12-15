import React, { useEffect, useState } from "react";
import { authService, dbService } from "myFirebase";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onClickLogOut = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyTweets = async (Obj) => {
    const myTweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", Obj.uid)
      .orderBy("createdAt", "desc")
      .get();
    console.log(myTweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyTweets(userObj);
  }, [userObj]);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
      setNewDisplayName("");
    }
  };
  const onChange = ({ currentTarget: { value } }) => {
    setNewDisplayName(value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update" />
      </form>
      <button onClick={onClickLogOut}>LOGOUT</button>
    </>
  );
};

export default Profile;

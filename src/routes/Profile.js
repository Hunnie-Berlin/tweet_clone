import React, { useEffect, useState } from "react";
import { authService, dbService } from "myFirebase";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Tweet from "components/Tweet";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 50px 10px 20px;
`;

const Form = styled.form`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  height: 40px;
  max-width: 400px;
  width: 90%;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 18px;
  background-color: white;
  color: black;
  border: 1px solid black;
  margin: 0 auto;
  margin-bottom: 5px;
  text-align: center;
  ::placeholder {
    color: #1da1f2;
  }
`;

const Submit = styled.button`
  height: 40px;
  max-width: 400px;
  width: 90%;
  margin: 5px 0;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 16px;
  background-color: #1da1f2;
  color: white;
  cursor: pointer;
`;

const Logout = styled.button`
  height: 40px;
  max-width: 400px;
  width: 90%;
  padding: 8px 16px;
  margin: 20px 0 50px;
  border-radius: 20px;
  font-size: 16px;
  background-color: #e74c3c;
  color: white;
  cursor: pointer;
`;

const TweetSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [myTweets, setMyTweets] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState(
    userObj?.displayName ? userObj.displayName : ""
  );
  const onClickLogOut = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyTweets = async () => {
    await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const twArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyTweets(twArr);
      });
  };
  useEffect(() => {
    getMyTweets();
  }, []);
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
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          onChange={onChange}
        />
        <Submit>UPDATE DISPLAY NAME</Submit>
      </Form>
      <Logout onClick={onClickLogOut}>LOGOUT</Logout>
      <TweetSection>
        {myTweets !== null &&
          myTweets.map((tw) => (
            <Tweet
              key={tw.id}
              twId={tw.id}
              twObj={tw}
              isOwner={tw.creatorId === userObj.uid}
            />
          ))}
      </TweetSection>
    </Container>
  );
};

export default Profile;

import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";
import { dbService } from "myFirebase";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 50px;
`;

const TweetSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const twArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(twArr);
      });
  }, []);

  return (
    <Container>
      <TweetFactory userObj={userObj} />
      <TweetSection>
        {tweets.length !== 0 &&
          tweets.map((tw) => (
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

export default Home;

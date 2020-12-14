import Tweet from "components/Tweet";
import { dbService } from "myFirebase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const twArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(twArr);
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");
  };
  const onChange = ({ target: { value } }) => {
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={tweet}
          onChange={onChange}
        />
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweets.length !== 0 &&
          tweets.map((tw, index) => (
            <Tweet
              key={tw.id}
              twObj={tw}
              isOwner={tw.creatorId === userObj.uid}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;

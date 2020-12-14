import Tweet from "components/Tweet";
import { dbService, storageService } from "myFirebase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [imgPath, setImgPath] = useState(null);
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
    let imgUrl = "";
    if (imgPath || imgPath !== "") {
      const fileRef = storageService
        .ref()
        .child(`${userObj.email}/${uuidv4()}`);
      const response = await fileRef.putString(imgPath, "data_url");
      imgUrl = await response.ref.getDownloadURL();
    }
    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      imgUrl,
    };
    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setImgPath(null);
  };
  const onChange = ({ target: { value } }) => {
    setTweet(value);
  };
  const onFileChange = ({ target: { files } }) => {
    const image = files[0];
    const reader = new FileReader();
    reader.onloadend = ({ currentTarget: { result } }) => {
      setImgPath(result);
    };
    reader.readAsDataURL(image);
  };
  const onClcikClear = () => setImgPath(null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Tweet" />
        {imgPath && (
          <div>
            <img src={imgPath} alt="preview" />
            <button onClick={onClcikClear}>Clear</button>
          </div>
        )}
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

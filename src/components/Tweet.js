import { dbService, storageService } from "myFirebase";
import React, { useState } from "react";

const Tweet = ({ twObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(twObj.text);
  const onClcikDelete = async () => {
    const ok = window.confirm("Are you sure to delete?");
    if (ok) {
      await dbService.doc(`tweets/${twObj.id}`).delete();
      twObj.imgUrl !== "" &&
        (await storageService.refFromURL(twObj.imgUrl).delete());
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onChange = ({ target: { value } }) => setNewTweet(value);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`tweets/${twObj.id}`).update({ text: newTweet });

    toggleEditing();
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit Tweet"
                  maxLength={120}
                  value={newTweet}
                  onChange={onChange}
                />
                <input type="submit" value="Update" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{twObj.text}</h4>
          {twObj.imgUrl && (
            <img
              src={twObj.imgUrl}
              alt="tweetedImgae"
              widht="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onClcikDelete}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;

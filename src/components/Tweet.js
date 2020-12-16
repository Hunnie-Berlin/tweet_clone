import { dbService, storageService } from "myFirebase";
import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 80%;
  max-width: 400px;
  min-width: 200px;
  min-height: 80px;
  padding: 12px 24px;
  border-radius: 16px;
  background-color: white;
  color: black;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  position: relative;
`;

const TweetText = styled.span`
  font-size: 22px;
  font-weight: 200;
  line-height: 1.2em;
`;

const ButtonEdit = styled.button`
  all: unset;
  font-size: 18px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  :hover {
    color: #1da1f2;
  }
`;

const ButtonDel = styled.button`
  all: unset;
  font-size: 18px;
  position: absolute;
  top: 10px;
  right: 40px;
  cursor: pointer;
  :hover {
    color: #e74c3c;
  }
`;

const Image = styled.img`
  position: absolute;
  bottom: -20px;
  right: -35px;
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

const Edit = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  height: 40px;
  width: 380px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 18px;
  background-color: white;
  color: black;
  border: 1px solid black;
  margin: 0 auto;
  margin-bottom: 10px;
  text-align: center;
  ::placeholder {
    color: #1da1f2;
  }
`;

const Submit = styled.input`
  height: 40px;
  width: 380px;
  margin: 5px 0;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 16px;
  background-color: #1da1f2;
  color: white;
  cursor: pointer;
`;

const Cancel = styled.button`
  height: 40px;
  width: 380px;
  margin: 5px 0;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 16px;
  background-color: #e74c3c;
  color: white;
  cursor: pointer;
`;

const Tweet = ({ twObj, isOwner, twId }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(twObj.text);
  const onClcikDelete = async () => {
    const ok = window.confirm("Are you sure to delete?");
    if (ok) {
      await dbService.doc(`tweets/${twId}`).delete();
      twObj.imgUrl !== "" &&
        (await storageService.refFromURL(twObj.imgUrl).delete());
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onChange = ({ target: { value } }) => setNewTweet(value);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`tweets/${twId}`).update({ text: newTweet });
    toggleEditing();
  };
  return (
    <Container>
      {editing ? (
        <>
          {isOwner && (
            <Edit>
              <Form onSubmit={onSubmit}>
                <Input
                  type="text"
                  placeholder="Edit Tweet"
                  maxLength={120}
                  value={newTweet}
                  onChange={onChange}
                />
                <Submit type="submit" value="UPDATE" />
              </Form>
              <Cancel onClick={toggleEditing}>Cancel</Cancel>
            </Edit>
          )}
        </>
      ) : (
        <>
          <TweetText>{twObj.text}</TweetText>
          {twObj.imgUrl && (
            <Image
              src={twObj.imgUrl}
              alt="tweetedImgae"
              widht="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <ButtonDel onClick={onClcikDelete}>
                <FontAwesomeIcon icon={faTrash} />
              </ButtonDel>
              <ButtonEdit onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </ButtonEdit>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Tweet;

import { dbService, storageService } from "myFirebase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTimes,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100%;
  min-height: 100px;
  margin: 50px 0 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextInputSection = styled.div`
  max-width: 400px;
  width: 90%;
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  height: 40px;
  width: 100%;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 16px;
  background-color: rgba(20, 20, 20, 1);
  color: white;
  border: 1px solid #1da1f2;
  ::placeholder {
    color: #1da1f2;
  }
`;

const Button = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: #1da1f2;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
`;

const Label = styled.label`
  color: #1da1f2;
  font-size: 18px;
  cursor: pointer;
`;

const Text = styled.span``;

const Upload = styled.input`
  opacity: 0;
`;

const Preview = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 75px;
`;

const ClearImage = styled.button`
  all: unset;
  color: #1da1f2;
  font-size: 14px;
  margin-top: 5px;
  cursor: pointer;
  width: 70px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [imgPath, setImgPath] = useState(null);
  const [fileValue, setFileValue] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    if (tweet !== "") {
      let imgUrl = "";
      if (imgPath) {
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
      if (imgPath) {
        setImgPath(null);
      }
    }
  };
  const onChange = ({ target: { value } }) => {
    setTweet(value);
  };
  const onFileChange = (e) => {
    const {
      target: { files, value },
    } = e;
    setFileValue(value);
    const image = files[0];
    const reader = new FileReader();
    reader.onloadend = ({ currentTarget: { result } }) => {
      setImgPath(result);
    };
    reader.readAsDataURL(image);
  };
  const onClcikClear = () => {
    setImgPath(null);
    setFileValue("");
  };
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <TextInputSection>
          <Input
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
            value={tweet}
            onChange={onChange}
          />
          <Button>
            <FontAwesomeIcon icon={faArrowRight} color="white" />
          </Button>
        </TextInputSection>
        <Label htmlFor="attach-file" className="factoryInput__label">
          <Text>Add photos </Text>
          <FontAwesomeIcon icon={faPlus} />
        </Label>
        <Upload
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          value={fileValue}
        />
        {imgPath && (
          <>
            <Preview src={imgPath} alt="preview" />
            <ClearImage onClick={onClcikClear}>
              remove <FontAwesomeIcon icon={faTimes} />
            </ClearImage>
          </>
        )}
      </Form>
    </Container>
  );
};

export default TweetFactory;

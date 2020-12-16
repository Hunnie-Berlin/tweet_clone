import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { dbService, storageService } from "myFirebase";

const Container = styled.div``;

const TweetTxt = styled.span`
  color: black;
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
`;

const ButtonDel = styled.button`
  all: unset;
  font-size: 18px;
  position: absolute;
  top: 10px;
  right: 40px;
`;

const Image = styled.img`
  position: absolute;
  bottom: -20px;
  right: -35px;
  width: 70px;
  height: 70px;
  border-radius: 50px;
`;

const TweetText = ({ text, imgUrl, id, isOwner, toggleEditing }) => {
  const onClcikDelete = async () => {
    const ok = window.confirm("Are you sure to delete?");
    if (ok) {
      await dbService.doc(`tweets/${id}`).delete();
      imgUrl !== "" && (await storageService.refFromURL(imgUrl).delete());
    }
  };
  return (
    <Container>
      <TweetTxt>{text}</TweetTxt>
      {imgUrl && (
        <Image src={imgUrl} alt="tweetedImgae" widht="50px" height="50px" />
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
    </Container>
  );
};

export default TweetText;

import { authService, firebaseInstance } from "myFirebase";
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Error from "./Error";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Google = styled.img`
  width: 16px;
  height: 16px;
`;

const Button = styled.button`
  min-height: 40px;
  max-width: 195px;
  width: 45%;
  margin: 0 5px;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 14px;
  background-color: white;
  color: black;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SocialLogin = ({ error, setError, loginMethod, setLoginMethod }) => {
  const onSocialClick = async ({ target: { name } }) => {
    try {
      let provider;
      if (name === "google") {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
      } else if (name === "github") {
        provider = new firebaseInstance.auth.GithubAuthProvider();
      }
      await authService.signInWithPopup(provider);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoginMethod("social");
    }
  };
  return (
    <>
      <Container>
        <Button name="google" onClick={onSocialClick}>
          Continue with Google{" "}
          <Google
            src="https://ddo0fzhfvians.cloudfront.net/uploads/icons/png/2659939281579738432-512.png"
            alt="google"
          />
        </Button>
        <Button name="github" onClick={onSocialClick}>
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </Button>
      </Container>
      {loginMethod === "social" && <Error error={error} />}
    </>
  );
};

export default SocialLogin;

import AuthForm from "components/AuthForm";
import SocialLogin from "components/SocialLogin";
import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  color: #1da1f2;
  font-size: 50px;
  width: 100%;
  margin: 20px;
  text-align: center;
`;

const Auth = () => {
  const [loginMethod, setLoginMethod] = useState("");
  const [error, setError] = useState("");
  return (
    <Container>
      <Icon>
        <FontAwesomeIcon icon={faTwitter} />
      </Icon>
      <AuthForm
        error={error}
        setError={setError}
        loginMethod={loginMethod}
        setLoginMethod={setLoginMethod}
      />
      <SocialLogin
        error={error}
        setError={setError}
        loginMethod={loginMethod}
        setLoginMethod={setLoginMethod}
      />
    </Container>
  );
};

export default Auth;

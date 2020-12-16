import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingAnim = keyframes`
0% {
    font-size: 50px;
    opacity: 1;
}
50% {
    font-size: 55px;
    opacity: 0.8;
}
100% {
    font-size: 50px;
    opacity: 1;
}
`;

const Icon = styled.div`
  color: #1da1f2;
  font-size: 50px;
  width: 100%;
  margin: 20px;
  text-align: center;
  animation: ${LoadingAnim} 0.5s ease-in-out infinite;
`;

const Loading = () => {
  return (
    <Container>
      <Icon>
        <FontAwesomeIcon icon={faTwitter} />
      </Icon>
    </Container>
  );
};

export default Loading;

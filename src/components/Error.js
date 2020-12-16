import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px 0;
  color: #e74c3c;
  max-width: 600px;
  width: 90%;
  line-height: 1.5em;
  text-align: center;
`;

const Error = ({ error }) => {
  return <Container>{error}</Container>;
};

export default Error;

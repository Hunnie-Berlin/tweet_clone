import { authService } from "myFirebase";
import React, { useState } from "react";
import styled from "styled-components";
import Error from "./Error";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  height: 40px;
  max-width: 400px;
  width: 90%;
  margin: 5px 0px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 16px;
  ::placeholder {
    color: #1da1f2;
  }
`;

const Button = styled.button`
  height: 40px;
  max-width: 400px;
  width: 90%;
  margin: 5px 0px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 16px;
  background-color: #1da1f2;
  color: white;
  cursor: pointer;
`;

const Toggle = styled.div`
  margin: 5px 0px 30px;
  color: #1da1f2;
  font-weight: 700;
  cursor: pointer;
`;

const AuthForm = ({ error, setError, loginMethod, setLoginMethod }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewAccount, setIsNewAccount] = useState(true);
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNewAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoginMethod("email");
    }
  };
  const toggleAccount = () => {
    setIsNewAccount((prev) => !prev);
  };
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <Button>{isNewAccount ? "Create Account" : "Sign In"}</Button>
        {loginMethod === "email" && <Error error={error} />}
        <Toggle onClick={toggleAccount}>
          {isNewAccount ? "Sign In" : "Create Account"}
        </Toggle>
      </Form>
    </>
  );
};

export default AuthForm;

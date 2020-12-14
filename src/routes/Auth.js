import { authService, firebaseInstance } from "myFirebase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewAccount, setIsNewAccount] = useState(true);
  const [loginMethod, setLoginMethod] = useState("");
  const [error, setError] = useState("");

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
      let data;
      if (isNewAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
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

  const onSocialClick = async ({ target: { name } }) => {
    try {
      let provider;
      if (name === "google") {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
      } else if (name === "github") {
        provider = new firebaseInstance.auth.GithubAuthProvider();
      }
      const data = await authService.signInWithPopup(provider);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoginMethod("social");
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <input
          type="submit"
          value={isNewAccount ? "Create Account" : "LOGIN"}
        />
        {loginMethod === "email" && error}
        <div onClick={toggleAccount}>
          {isNewAccount ? " wanna Login" : "wanna Create Account"}
        </div>
      </form>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
        {loginMethod === "social" && error}
      </div>
    </div>
  );
};

export default Auth;

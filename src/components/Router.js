import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";
import styled from "styled-components";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Router = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Container>
      <HashRouter>
        {isLoggedIn && <Navigation userObj={userObj} />}
        <Switch>
          {isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/">
                <Auth />
              </Route>
            </>
          )}
        </Switch>
      </HashRouter>
    </Container>
  );
};

export default Router;

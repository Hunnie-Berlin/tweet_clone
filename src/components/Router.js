import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  !isLoggedIn && setIsLoggedIn(true);
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Home /> : <Auth />}
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default Router;

import React, { useEffect, useState } from "react";
import Router from "components/Router";
import { authService } from "myFirebase";

const App = () => {
  const [isInit, setIsInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsInit(true);
    });
  }, []);

  return (
    <div>
      {isInit ? <Router isLoggedIn={isLoggedIn} /> : "Loading.."}
      <footer>&copy; Bible-Tweet {new Date().getFullYear()}</footer>
    </div>
  );
};

export default App;

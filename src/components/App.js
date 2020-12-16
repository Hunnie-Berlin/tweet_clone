import React, { useEffect, useState } from "react";
import Router from "components/Router";
import { authService } from "myFirebase";
import Globalstyle from "components/GlobalStyle";
import Loading from "./Loading";

const App = () => {
  const [isInit, setIsInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setIsInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <div>
      <Globalstyle />
      {isInit ? (
        <Router
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default App;

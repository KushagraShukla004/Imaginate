/* eslint-disable react/prop-types */
import { useState } from "react";
import { AppContext } from "./AppContext"; // Import the context

const AppContextProvider = ({ children }) => {
  // user logged-in or not
  const [user, setUser] = useState(null);
  //login/signup dialog box open/close state
  const [showLogin, setShowLogin] = useState(false);

  const value = { user, setUser, showLogin, setShowLogin };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

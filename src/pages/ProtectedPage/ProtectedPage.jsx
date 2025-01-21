// React
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { AuthContext } from "../../store/AuthContext";
import { isTokenExpired } from "../../api/auth";

import { ROUTE } from "../../constants";

export default function ProtectedPage({ children }) {
  // const { auth, setAuth } = useContext(AuthContext);
  // const redirect = useNavigate();

  // useEffect(() => {
  //   const isLoggedIn = () => {
  //     console.log("Running isLoggedIn..");

  //     // If there is no access token, redirect to the login page
  //     if (!auth.accessToken) {
  //       redirect(ROUTE.LOGIN);
  //     }

  //     // If there is an access token, but it is expired, then redirect
  //     if (auth.accessToken && isTokenExpired(auth.accessToken)) {
  //       setAuth({ accessToken: null, userId: null, userFirstname: null });
  //       redirect(ROUTE.LOGIN);
  //     }
  //   };

  //   isLoggedIn();

  //   //Implementing the setInterval method
  //   const interval = setInterval(() => {
  //     isLoggedIn();
  //   }, 30000);

  //   //Clearing the interval
  //   return () => clearInterval(interval);
  // }, []);

  return <>{children}</>;
}

ProtectedPage.propTypes = {
  children: PropTypes.node,
};

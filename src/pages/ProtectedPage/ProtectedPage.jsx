// React
import { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { AuthContext } from "../../store/AuthContext";
import { readRefreshToken } from "../../storage";
import { useRefreshSession } from "../../rqhooks/useRefreshSession";

export default function ProtectedPage({ children }) {

  const { auth } = useContext(AuthContext);
  const refreshToken = readRefreshToken();
  const { mutate: refreshSession } = useRefreshSession();

  useEffect(() => {

    // If the user hasn't signed in, try refreshing the session.
    if (!auth.userId) {
      refreshSession(refreshToken);
    }
  
  }, [auth]);

  return <>{children}</>;
}

ProtectedPage.propTypes = {
  children: PropTypes.node,
};

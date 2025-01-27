import { useContext } from "react";

import { AuthContext } from "../../store/AuthContext";
import { UserContext } from "../../store/UserContext";

export default function UserDetail() {
  const { auth } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  return (
    <div>
      {user.userFirstname ? (
        <h1>Hi, {user.userFirstname}</h1>
      ) : (
        <h1>Loading..</h1>
      )}
    </div>
  );
}

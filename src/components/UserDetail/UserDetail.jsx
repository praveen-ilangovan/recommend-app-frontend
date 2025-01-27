import { useContext } from "react";

import { AuthContext } from "../../store/AuthContext";

export default function UserDetail() {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      {auth.userFirstname ? (
        <h1>Hi, {auth.userFirstname}</h1>
      ) : (
        <h1>Loading..</h1>
      )}
    </div>
  );
}

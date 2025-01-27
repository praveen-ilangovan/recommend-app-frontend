import { useContext } from "react";

import { UserContext } from "../../store/UserContext";

export default function UserDetail() {
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

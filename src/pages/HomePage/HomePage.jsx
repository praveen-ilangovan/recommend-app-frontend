import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components: Project
import Container from "react-bootstrap/Container";

// Components: Local
import UserDetail from "../../components/UserDetail/UserDetail";
import BoardList from "../../components/BoardList/BoardList";

import { AuthContext } from "../../store/AuthContext";
import { ROUTE } from "../../constants";

export default function HomePage() {

  const { auth } = useContext(AuthContext);
  const redirect = useNavigate();

  return (
    <Container fluid className="recommend-page-container">
      <UserDetail />
      <BoardList />
    </Container>
  );
}

// Components: Project
import Container from "react-bootstrap/Container";

// Components: Local
import UserDetail from "../../components/UserDetail/UserDetail";
import BoardList from "../../components/BoardList/BoardList";

export default function HomePage() {

  return (
    <Container fluid className="recommend-page-container">
      <UserDetail />
      <BoardList />
    </Container>
  );
}

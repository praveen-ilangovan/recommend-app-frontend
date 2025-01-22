// Components: Project
import Container from "react-bootstrap/Container";

// Components: Local
import BoardPreview from "../../components/BoardPreview/BoardPreview";
import ProtectedPage from "../ProtectedPage/ProtectedPage";

// Hooks
import { useGetLoggedInUserData } from "../../rqhooks/useGetLoggedInUserData";

export default function LandingPage() {

  let user = {};
  let boards = [];

  const { data: meData, isSuccess } = useGetLoggedInUserData();

  if (isSuccess) {

    user = meData?.user;

    if (meData?.boards) {
      for (const board of meData?.boards || {}) {
        boards.push(
          <BoardPreview
            key={board.id}
            boardId={board.id}
            boardName={board.name}
          />,
        );
      }
    }
  }

  return (
    <ProtectedPage>
      <Container fluid className="recommend-page-container">
        <div>
          {user?.first_name ? (
            <h1>Hi, {user.first_name}</h1>
          ) : (
            <h1>Loading..</h1>
          )}
          {boards}
        </div>
      </Container>
    </ProtectedPage>
  );
}

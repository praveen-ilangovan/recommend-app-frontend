// React
import { Link } from "react-router-dom";

// Components: Project
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// Components: Local
import BoardPreview from "../../components/BoardPreview/BoardPreview";

// Styling: Local
import "./BoardList.css";

import { useGetLoggedInUserData } from "../../rqhooks/useGetLoggedInUserData";
import { ROUTE } from "../../constants";

export default function BoardList() {
  let boards = [];

  const { data: meData, isSuccess } = useGetLoggedInUserData();

  if (isSuccess) {
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
    <div>
      {boards.length
        ? boards
        :
        <Container fluid className="recommend-page-container boardlist-display-center">
          <Link to={ROUTE.CREATE_CARD}>
            <Button variant="success" type="button"> Add Card </Button>
          </Link>
        </Container>
      }
    </div>
  );
}

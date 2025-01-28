// React
import { useParams } from "react-router-dom";

// Components: Project
import Container from "react-bootstrap/Container";

// Components: Local
import BoardKnobControlPanel from "../../components/BoardKnobControlPanel/BoardKnobControlPanel";
import CardGrid from "../../components/CardGrid/CardGrid";

// Styling: Local
import "./BoardPage.css";

import ProtectedPage from "../ProtectedPage/ProtectedPage";

import { useGetBoard } from "../../rqhooks/useGetBoard";

export default function BoardPage() {
  const params = useParams();
  let name = "";
  let isPrivateBoard = false;
  let ownerId = '';

  const { data, isSuccess } = useGetBoard(params.boardId);

  if (isSuccess) {
    console.log("data :", data.data.board)
    name = data?.data?.board.name;
    isPrivateBoard = data?.data?.board.private;
    ownerId = data?.data?.board.owner_id;
  }

  return (
    <ProtectedPage redirectUponError={ false }>
      <Container fluid className="recommend-page-container">
        <div className="board-page-control-panel">
          <BoardKnobControlPanel
            boardId={params.boardId}
            boardName={name}
            isPrivateBoard={isPrivateBoard}
            ownerId={ownerId}
          />
        </div>
        <div>
          <CardGrid boardId={params.boardId} />
        </div>
      </Container>
    </ProtectedPage>
  );
}


// Components: Project
import Container from "react-bootstrap/Container";

// Components: Local
import BoardKnobControlPanel from "../../components/BoardKnobControlPanel/BoardKnobControlPanel";
import CardGrid from "../../components/CardGrid/CardGrid";

import { useGetBoard } from "../../rqhooks/useGetBoard";

// Styling: Local
import "./BoardView.css";

export default function BoardView({ boardId }) {
  
  let name = "";
  let isPrivateBoard = false;
  let ownerId = '';

  // Get the board data
  const { data, isSuccess } = useGetBoard(boardId);
  if (isSuccess) {
    name = data?.data?.board.name;
    isPrivateBoard = data?.data?.board.private;
    ownerId = data?.data?.board.owner_id;
  }

  return (
    <Container fluid className="recommend-page-container">
      <div className="board-view-control-panel">
        <BoardKnobControlPanel
          boardId={boardId}
          boardName={name}
          isPrivateBoard={isPrivateBoard}
          ownerId={ownerId}
        />
      </div>
      <div>
        <CardGrid boardId={boardId} />
      </div>
    </Container>
  );
}

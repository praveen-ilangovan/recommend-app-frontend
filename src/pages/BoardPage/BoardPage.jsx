// React
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Components: Project
import Container from "react-bootstrap/Container";

// Components: Local
import BoardKnobControlPanel from "../../components/BoardKnobControlPanel/BoardKnobControlPanel";
import CardGrid from "../../components/CardGrid/CardGrid";

// Styling: Local
import "./BoardPage.css";

import ProtectedPage from "../ProtectedPage/ProtectedPage";

import { AuthContext } from "../../store/AuthContext";
import { getBoard } from "../../api/app";

export default function BoardPage() {
  const { auth } = useContext(AuthContext);
  const params = useParams();
  let name = "";
  let isPrivateBoard = false;

  const { data, isSuccess } = useQuery({
    queryKey: ["boards", params.boardId],
    queryFn: async () => {
      const board1 = await getBoard(auth.accessToken, params.boardId);
      return board1;
    },
    refetchIntervalInBackground: false,
  });

  if (isSuccess) {
    name = data?.data?.board.name;
    isPrivateBoard = data?.data?.board.private;
  }

  return (
    <ProtectedPage>
      <Container fluid className="recommend-page-container">
        <div className="board-page-control-panel">
          <BoardKnobControlPanel
            boardId={params.boardId}
            boardName={name}
            isPrivateBoard={isPrivateBoard}
          />
        </div>
        <div>
          <CardGrid boardId={params.boardId} />
        </div>
      </Container>
    </ProtectedPage>
  );
}

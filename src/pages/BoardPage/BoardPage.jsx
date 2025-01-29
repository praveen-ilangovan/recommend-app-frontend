// React
import { useParams } from "react-router-dom";

import ProtectedPage from "../ProtectedPage/ProtectedPage";
import BoardView from "../../components/BoardView/BoardView";

export default function BoardPage() {
  const params = useParams();

  return (
    <ProtectedPage redirectUponError={ false }>
      <BoardView boardId={params.boardId} />
    </ProtectedPage>
  );
}

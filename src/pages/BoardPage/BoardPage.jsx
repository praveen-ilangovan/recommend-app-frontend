// React
import { useParams } from 'react-router-dom';

// Components: Project
import Container from 'react-bootstrap/Container';

// Components: Local
import BoardKnobControlPanel from '../../components/BoardKnobControlPanel/BoardKnobControlPanel';
import CardGrid from '../../components/CardGrid/CardGrid';

// Styling: Local
import "./BoardPage.css";

// Data
import { BOARDS } from '../../../data';

export default function BoardPage() {

  function getBoard(boardId) {
    for (const [id, board] of Object.entries(BOARDS)) {
      if (id === boardId) {
        return board
      }
    }
  }

  const params = useParams();
  const board = getBoard(params.boardId);

  return (
    <Container fluid className='recommend-page-container'>
      <div className='board-page-control-panel'>
        <BoardKnobControlPanel boardId={params.boardId} boardName={board.name} isPrivateBoard={board.private} />
      </div>
      <div>
        <CardGrid boardId={params.boardId} />
      </div>
    </Container>
  );
}

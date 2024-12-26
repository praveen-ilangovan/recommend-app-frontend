// Components: Project
import Container from 'react-bootstrap/Container';

// Components: Local
import BoardPreview from "../../components/BoardPreview/BoardPreview";

// Data
import { BOARDS } from '../../../data';

export default function LandingPage() {

  const boards = [];
  function populateBoards() {
    for (const [id, board] of Object.entries(BOARDS)) {
      boards.push( <BoardPreview key={id} boardId={id}/> )
    }
  }
  populateBoards();

  return (
    <Container fluid className='recommend-page-container'>
        <div>
          {boards}
        </div>
    </Container>
  );
}

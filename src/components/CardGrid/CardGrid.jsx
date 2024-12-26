import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Components: Local
import CardPreview from '../CardPreview/CardPreview';

import "./CardGrid.css";

// Data: Local
import { BOARDS, CAARDS } from '../../../data';

export default function CardGrid({boardId}) {

  const cards = [];
  function populateCards() {
    for (const [id, board] of Object.entries(BOARDS)) {
      if (id === boardId) {
        for (const cardId of board.cards) {
          const card = CAARDS[cardId];
          cards.push(
            <Col key={cardId} className='recommend-grid-col card-grid-col'>
              <div>
                <CardPreview key={cardId} {...card} />
              </div>
            </Col>);
        }
        break;
      }
    }
  }
  populateCards();

  return (
    <Container fluid className='recommend-page-container'>
      <Row className='recommend-grid-row'>
        {cards}
      </Row>
    </Container>
  );
}

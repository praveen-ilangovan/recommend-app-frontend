// React
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Components: Local
import CardPreview from '../CardPreview/CardPreview';

import { AuthContext } from '../../store/AuthContext';
import { getBoard } from '../../api/app';

// Styling: Local
import "./CardGrid.css";

// Data: Local
import { BOARDS, CAARDS } from '../../../data';

export default function CardGrid({boardId}) {

  const {auth} = useContext(AuthContext);
  const cards = [];

  const {isLoading, data, isSuccess, error, isError} = useQuery({
    queryKey: ['boards', boardId],
    queryFn: async () => {
      const board1 = await getBoard(auth.accessToken, boardId);
      return board1;
    },
    refetchIntervalInBackground: false
  });

  if (isSuccess) {
    for (const card of data?.data?.cards) {
      cards.push(
        <Col key={card.id} className='recommend-grid-col card-grid-col'>
          <div>
            <CardPreview key={card.id} {...card} />
          </div> 
        </Col>
      )
    }
  }

  // function populateCards() {
  //   for (const [id, board] of Object.entries(BOARDS)) {
  //     if (id === boardId) {
  //       for (const cardId of board.cards) {
  //         const card = CAARDS[cardId];
  //         cards.push(
  //           <Col key={cardId} className='recommend-grid-col card-grid-col'>
  //             <div>
  //               <CardPreview key={cardId} {...card} />
  //             </div>
  //           </Col>);
  //       }
  //       break;
  //     }
  //   }
  // }
  // populateCards();

  return (
    <Container fluid className='recommend-page-container'>
      <Row className='recommend-grid-row'>
        {cards}
      </Row>
    </Container>
  );
}

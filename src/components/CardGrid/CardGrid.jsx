import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Components: Local
import CardPreview from '../CardPreview/CardPreview';

import "./CardGrid.css";

// Data: Local
import { CARDS } from '../../../data';

export default function CardGrid() {
  return (
    <Container fluid>
      <Row>
        {CARDS.map( (card) => <Col key={card.id} className='col-style'><div><CardPreview key={card.id} {...card} /></div></Col> )}
      </Row>
    </Container>
  );
}

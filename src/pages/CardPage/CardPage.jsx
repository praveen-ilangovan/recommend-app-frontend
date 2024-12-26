// React
import { useParams } from 'react-router-dom';

// Components: Project
import Container from 'react-bootstrap/Container';

// Components: Local
import CardDetail from '../../components/CardDetail/CardDetail';

// Styling: Local
import "./CardPage.css";

// Data: Local
import { CAARDS } from '../../../data';

export default function CardPage() {

  const params = useParams();

  function getCard(cardId) {
    for (const [id, card] of Object.entries(CAARDS)) {
      if (id === cardId) {
        return card;
      }
    }
  }
  const card = getCard(params.cardId);

  return (
    <Container fluid className='recommend-page-container'>
      <div className='card-page-div'>
        {/* <CardDetail 
          title={card.title}
          description={card.description}
          thumbnail={card.thumbnail}
          url={card.url}
          id={card.id}
          editable
        /> */}
        <CardDetail {...card} editable />
      </div>
    </Container>
  );
}

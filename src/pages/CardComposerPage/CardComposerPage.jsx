// React
import { useParams } from 'react-router-dom';

// Components: Local
import CardComposer from '../../components/CardComposer/CardComposer';

// Data: Local
import { CAARDS } from '../../../data';

export default function CardComposerPage() {

  const params = useParams();
  let card = {};

  function getCard(cardId) {
    for (const [id, card] of Object.entries(CAARDS)) {
      if (id === cardId) {
        return card;
      }
    }
  }

  if (params.cardId) {
    card = getCard(params.cardId);
  }

  return (
    <CardComposer {...card}/>
  );
}

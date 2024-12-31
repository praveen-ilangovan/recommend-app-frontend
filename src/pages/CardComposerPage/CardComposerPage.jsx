// React
import { useParams } from 'react-router-dom';

// Components: Local
import CardComposer from '../../components/CardComposer/CardComposer';

export default function CardComposerPage() {

  const params = useParams();
  let card = {id: '',
              url: '',
              thumbnail: '',
              title: "Title",
              description: "Description..."};

  return (
    <CardComposer card={card} mode='create' />
  );
}

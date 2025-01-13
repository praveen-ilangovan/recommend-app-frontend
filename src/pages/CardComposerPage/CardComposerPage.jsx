// React
import { useParams } from 'react-router-dom';

// Components: Local
import CardComposer from '../../components/CardComposer/CardComposer';
import ProtectedPage from '../ProtectedPage/ProtectedPage';

export default function CardComposerPage() {

  const params = useParams();
  let card = {id: '',
              url: '',
              thumbnail: '',
              title: "Title",
              description: "Description..."};

  return (
    <ProtectedPage>
      <CardComposer card={card} mode='create' />
    </ProtectedPage>
  );
}

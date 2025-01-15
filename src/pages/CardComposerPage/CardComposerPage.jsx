
// Components: Local
import CardComposer from '../../components/CardComposer/CardComposer';
import ProtectedPage from '../ProtectedPage/ProtectedPage';

export default function CardComposerPage() {

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

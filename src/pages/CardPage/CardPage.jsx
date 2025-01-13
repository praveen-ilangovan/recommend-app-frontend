// React
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Components: Project
import Container from 'react-bootstrap/Container';

// Components: Local
import CardDetail from '../../components/CardDetail/CardDetail';
import CardComposer from '../../components/CardComposer/CardComposer';

// Styling: Local
import "./CardPage.css";

import { AuthContext } from '../../store/AuthContext';
import { getCard } from '../../api/app';
import ProtectedPage from '../ProtectedPage/ProtectedPage';

export default function CardPage() {

  const params = useParams();
  const {auth} = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);

  let card = {}

  // ReactQuery
  const {isLoading, data, isSuccess, error, isError} = useQuery({
    queryKey: ['cards', params.cardId],
    queryFn: async () => {
      return await getCard(auth.accessToken, params.cardId);
    },
    refetchIntervalInBackground: false
  });

  if (isSuccess) {
    card = data?.data;
  }

  return (
    <ProtectedPage>
      <Container fluid className='recommend-page-container'>
        <div className={editMode ? 'card-page-hide-component' : 'card-page-div'}>
          <CardDetail {...card} editable onEdit={() => setEditMode(true)} />
        </div>

        <div className={editMode ? 'card-page-div' : 'card-page-hide-component'}>
          <CardComposer card={card} onSave={() => setEditMode(false)} onCancel={() => setEditMode(false)} mode="edit"/>
        </div>
      </Container>
    </ProtectedPage>
  );
}

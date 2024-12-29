// React
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Components: Project
import Container from 'react-bootstrap/Container';

// Components: Local
import CardDetail from '../../components/CardDetail/CardDetail';

// Styling: Local
import "./CardPage.css";

import { AuthContext } from '../../store/AuthContext';
import { getCard } from '../../api/app';

export default function CardPage() {

  const params = useParams();
  const {auth} = useContext(AuthContext);
  let card = {}

  const {isLoading, data, isSuccess, error, isError} = useQuery({
    queryKey: ['cards', params.cardId],
    queryFn: async () => {
      const card1 = await getCard(auth.accessToken, params.cardId);
      return card1;
    },
    refetchIntervalInBackground: false
  });

  if (isSuccess) {
    card = data?.data;
  }

  return (
    <Container fluid className='recommend-page-container'>
      <div className='card-page-div'>
        <CardDetail {...card} editable />
      </div>
    </Container>
  );
}

// React
import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// Components: Project
import Container from 'react-bootstrap/Container';

// Components: Local
import BoardPreview from "../../components/BoardPreview/BoardPreview";

// Hooks
import { AuthContext } from '../../store/AuthContext';
import { isTokenExpired } from '../../api/auth';
import { getMe } from '../../api/app';

// Data
import { ROUTE } from '../../constants';

export default function LandingPage() {

  const {auth, setAuth} = useContext(AuthContext);
  const redirect = useNavigate();
  let boards = [];

  // Redirect to login page if a user is not signed in
  useEffect(() => {
    if (!auth.accessToken) {
      redirect(ROUTE.LOGIN);
    }

    if (auth.accessToken && isTokenExpired(auth.accessToken)) {
      setAuth({
        accessToken: null,
        userId: null,
        userFirstname: null
    });
      redirect(ROUTE.LOGIN);
    }

  }, [redirect]);

  const {isLoading, data:meData, isSuccess, error, isError} = useQuery({
    queryKey: ['me', auth.userId],
    queryFn: async () => {
      const data = await getMe(auth.accessToken);
      return data;
    },
    refetchIntervalInBackground: false
    // Stop loading and fetching until it is invalidated.
  });

  if (isError) {
    return <h1>{error}</h1>
  }

  if (isSuccess) {
    console.log("Got me data!!")
    if (meData?.data?.boards) {
      for (const board of meData?.data?.boards) {
        boards.push( <BoardPreview key={board.id} boardId={board.id} boardName={board.name} /> )
      }
    }
  }

  return (
    <Container fluid className='recommend-page-container'>
        <div>
          {auth.userFirstname ? <h1>Hi, {auth.userFirstname}</h1> : <h1>No signed in..</h1>}
          {boards}
        </div>
    </Container>
  );
}

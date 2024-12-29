// React
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Components: Project
import Container from 'react-bootstrap/Container';

// Components: Local
import BoardPreview from "../../components/BoardPreview/BoardPreview";

import { AuthContext } from '../../store/AuthContext';

// Data
import { BOARDS } from '../../../data';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcmF2ZWVuQG1haWwuY29tIiwiZW1haWxfYWRkcmVzcyI6InByYXZlZW5AbWFpbC5jb20iLCJpZCI6IjY3NTE5YTNmNmYyYjYzZGRjNzIzOWJhOSIsInVzZXJfbmFtZSI6InByYXZlZW4iLCJmaXJzdF9uYW1lIjoiUHJhdmVlbiIsImxhc3RfbmFtZSI6IklsYW5nb3ZhbiIsImV4cCI6MTczNTM4NzIwM30.6SPm9DmdPkqRjkSbHiOA_ipXTcmTQTZo-X3Dp1nz7PQ"

// const getBoards = () => {
//   return axios.get("http://127.0.0.1:8000/me/?show_page=false", {
//     headers: {
//       UserAuthData: JSON.stringify({"access_token": token}) //the token is a variable which holds the token
//     }});
// }

const getBoards = () => {
  return axios.get("http://127.0.0.1:8000/me/?show_page=false", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
}

export default function LandingPage() {

  const {auth} = useContext(AuthContext);

  // const {isLoading, data, isSuccess} = useQuery({
  //   queryKey: ['boards'],
  //   queryFn: getBoards
  // });

  // if (isSuccess) {
  //   console.log(data);
  // }

  const boards = [];
  function populateBoards() {
    for (const [id, board] of Object.entries(BOARDS)) {
      boards.push( <BoardPreview key={id} boardId={id}/> )
    }
  }
  populateBoards();

  return (
    <Container fluid className='recommend-page-container'>
        <div>
          {auth.userFirstname ? <h1>Hi, {auth.userFirstname}</h1> : <h1>No signed in..</h1>}

          {/* <ul>
            {data?.data.map( (board) => <li key={board.id}>{board.name}</li> )}
          </ul> */}
          {boards}
        </div>
    </Container>
  );
}

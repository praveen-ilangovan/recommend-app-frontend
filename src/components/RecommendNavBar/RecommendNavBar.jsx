// Components: Project
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


// Components: Local
import RecommendBrandName from '../RecommendBrandName/RecommendBrandName';

// Styling: Local
import "./RecommendNavBar.css";

export default function RecommendNavBar({isLoggedIn = true, user}) {

  const isUserLoggedIn = isLoggedIn;
  const loggedInUser = user;

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">
          <RecommendBrandName size="24px" />
        </Navbar.Brand>

        <Navbar.Collapse className="justify-content-end">
          {!isUserLoggedIn ? <SignUpButtons /> : (<></>)}
          {!loggedInUser ? <SignedInUser userInitial="P"/> : (<></>)}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function SignUpButtons() {
  return (
    <div>
      <Button variant="primary" type="button" className='navbar-signup-button'>Log in</Button>
      <Button variant="success" type="button" className='navbar-signup-button'>Join Now</Button>
    </div>
  );
}

function SignedInUser({userInitial}) {

  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  // TODO: Find the contrast color for text at this point

  return (
    <div className='signed-user-options'>
      <FontAwesomeIcon icon={faPlus} className='signup-user-button'/>
      <div style={{ backgroundColor: randomColor }} className='dot signup-user-button'>{userInitial}</div>
    </div>
  )
}

// React
import { Link } from 'react-router-dom';

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

export default function RecommendNavBar({isLoggedIn = false, user="hello"}) {

  const isUserLoggedIn = isLoggedIn;
  const loggedInUser = user;

  return (
    <Navbar className="navbar-light">
      <Container fluid>
        <Navbar.Brand href="#">
          <RecommendBrandName size="24px" />
        </Navbar.Brand>

        <Navbar.Collapse className="justify-content-end">
          {!isUserLoggedIn ? <SignUpButtons /> : undefined}
          {loggedInUser ? <SignedInUser userInitial="P"/> : undefined}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function SignUpButtons() {
  return (
    <div>
      <Link to="/session/new">
        <Button
          variant="primary"
          type="button"
          className='navbar-signup-button'
        >
          Log in
        </Button>
      </Link>

      <Link to="/users/new">
        <Button
          variant="success"
          type="button"
          className='navbar-signup-button'
        >
          Join Now
        </Button>
      </Link>
    </div>
  );
}

function SignedInUser({userInitial}) {

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  const bgColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  const rgbColor = hexToRgb(bgColor);
  let textColor = "#ffffff";
  if ( (rgbColor.r*0.299) + (rgbColor.g*0.587) + (rgbColor.b*0.114) > 186) {
    textColor = "#000000";
  }

  return (
    <div className='signed-user-options'>
      <Link to="/cards/new">
        <FontAwesomeIcon
          icon={faPlus}
          className='signup-user-button'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Add a card"
        />
      </Link>
      <div style={{ backgroundColor: bgColor, color: textColor }} className='dot signup-user-button'>{userInitial}</div>
    </div>
  )
}

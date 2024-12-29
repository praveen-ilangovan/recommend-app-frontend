// React
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

// Components: Project
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// Components: Local
import RecommendBrandName from '../RecommendBrandName/RecommendBrandName';

// Context
import { AuthContext } from '../../store/AuthContext';

// Styling: Local
import "./RecommendNavBar.css";

export default function RecommendNavBar() {

  const {auth} = useContext(AuthContext);

  return (
    <Navbar className="navbar-light">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <RecommendBrandName size="24px" />
          </Link>
        </Navbar.Brand>

        <Navbar.Collapse className="justify-content-end">
          {!auth.accessToken ?
            <SignUpButtons /> :
            <SignedInUser />}
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

function SignedInUser() {

  const {auth, setAuth} = useContext(AuthContext);
  const redirect = useNavigate();

  function logout() {
    setAuth({
      accessToken: null,
      userId: null,
      userFirstname: null
  });
    redirect("/session/new");
  }

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

      <Nav className="mr-sm-2">
        <NavDropdown
          title={
              <span style={{ backgroundColor: bgColor, color: textColor }} className='dot'>
                {auth.userFirstname[0].toUpperCase()}
              </span>
          }>
          <NavDropdown.Item>Hi, {auth.userFirstname}</NavDropdown.Item>
          <NavDropdown.Item href="/example-app/section-a/">Profile</NavDropdown.Item>
          <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>

    </div>
  )
}

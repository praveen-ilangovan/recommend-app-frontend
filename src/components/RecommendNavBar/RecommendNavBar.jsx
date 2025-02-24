// React
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

// Components: Project
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Components: Local
import RecommendBrandName from "../RecommendBrandName/RecommendBrandName";

// Context
import { UserContext } from "../../storage/context/UserContext";
import { clearTokens } from "../../storage/token";

// Styling: Local
import "./RecommendNavBar.css";

import { ROUTE, DEFAULT_USER_DATA } from "../../constants";

export default function RecommendNavBar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar className="navbar-light">
      <Container fluid>
        <Navbar.Brand>
          <Link to={ROUTE.HOME}>
            <RecommendBrandName size="24px" />
          </Link>
        </Navbar.Brand>

        <Navbar.Collapse className="justify-content-end">
          {!user.userId ? <SignUpButtons /> : <SignedInUser />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function SignUpButtons() {
  return (
    <div>
      <Link to={ROUTE.LOGIN}>
        <Button
          variant="primary"
          type="button"
          className="navbar-signup-button"
        >
          Log in
        </Button>
      </Link>

      <Link to={ROUTE.REGISTER}>
        <Button
          variant="success"
          type="button"
          className="navbar-signup-button"
        >
          Join Now
        </Button>
      </Link>
    </div>
  );
}

function SignedInUser() {
  const { user, setUser } = useContext(UserContext);

  const redirect = useNavigate();

  function logout() {
    setUser(DEFAULT_USER_DATA);
    clearTokens();
    redirect(ROUTE.LOGIN);
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  const bgColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const rgbColor = hexToRgb(bgColor);
  let textColor = "#ffffff";
  if (
    rgbColor &&
    rgbColor.r * 0.299 + rgbColor.g * 0.587 + rgbColor.b * 0.114 > 186
  ) {
    textColor = "#000000";
  }

  return (
    <div className="signed-user-options">
      <Link to={ROUTE.CREATE_CARD}>
        <FontAwesomeIcon
          icon={faPlus}
          className="signup-user-button"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Add a card"
        />
      </Link>

      <Nav className="mr-sm-2">
        <NavDropdown
          title={
            <span
              style={{ backgroundColor: bgColor, color: textColor }}
              className="dot"
            >
              {user.userFirstname[0].toUpperCase()}
            </span>
          }
        >
          <NavDropdown.Item>Hi, {user.userFirstname}</NavDropdown.Item>
          <NavDropdown.Item href="/example-app/section-a/">
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

// Components: Project
import Card from "react-bootstrap/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import pageNotFoundImg from "../../assets/img/404.jpg";
import accessDeniedImg from "../../assets/img/access_denied.png"
import placeholderImg from "../../assets/img/placeholder-image.jpg";

import { ROUTE } from "../../constants";

// Styling: Local
import "./ErrorMsg.css";

const MESSAGES = {
  "404": {
    title: "Uh Oh!",
    img: pageNotFoundImg,
    msg: "The page you were looking for doesn't exist."
  },
  "403": {
    title: "Access Denied!",
    img: accessDeniedImg,
    msg: "You are not authorised to view this page."
  },
  "DEFAULT": {
    title: "Unknown error",
    img: placeholderImg,
    msg: "This should not have happened."
  }
}

export default function ErrorMsg({ code }) {
  const redirect = useNavigate();
  const key = code in MESSAGES ? code : 'DEFAULT';

  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img variant="top" src={MESSAGES[key].img} />
      <Card.Body>
        <Card.Title>{MESSAGES[key].title}</Card.Title>
        <Card.Text>{MESSAGES[key].msg} Press the home button to resume your journey.</Card.Text>

        <div className="control-panel">
          <FontAwesomeIcon
            className="pointer"
            icon={faHouse}
            onClick={() => redirect(ROUTE.HOME)}
          />
        </div>

      </Card.Body>
    </Card>
  );
}

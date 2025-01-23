// React
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Components: Project
import Card from "react-bootstrap/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

// Styling: Local
import "./CardDetail.css";

// Data: Local
import placeholderImg from "../../assets/img/placeholder-image.jpg";
import { ROUTE } from "../../constants";

import { useDeleteCard } from "../../rqhooks/useDeleteCard";

export default function CardDetail({
  id,
  url,
  title,
  thumbnail,
  description,
  board_id,
  editable = false,
  onEdit,
}) {
  const redirect = useNavigate();

  // Set the image to a placeholder one if thumbnail is null or undefined.
  const img = thumbnail ? thumbnail : placeholderImg;

  // ReactQuery
  const { mutateAsync: deleteCard } = useDeleteCard(id, board_id);

  const backToBoard = () => {
    const boardUrl = ROUTE.BOARD.replace(":boardId", board_id);
    redirect(boardUrl);
  }

  const onDeleteClicked = async () => {
    return await deleteCard({
      cardId: id,
    });
  };

  const openUrlInNewTab = (event) => {
    event.preventDefault();
    window.open(url, "_blank", "noopener", "noreferrer");
  }

  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>

        <div className="control-panel">
          <FontAwesomeIcon
            icon={faBorderAll}
            onClick={backToBoard}
          />
          <FontAwesomeIcon
            icon={faEdit}
            className={editable ? "knob" : "hide"}
            onClick={onEdit}
          />
          <FontAwesomeIcon
            icon={faBan}
            className={editable ? "knob" : "hide"}
            onClick={onDeleteClicked}
          />
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            onClick={openUrlInNewTab}
          />


        </div>
      </Card.Body>
    </Card>
  );
}

CardDetail.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  description: PropTypes.string,
  board_id: PropTypes.string,
  editable: PropTypes.bool,
  onEdit: PropTypes.func,
};

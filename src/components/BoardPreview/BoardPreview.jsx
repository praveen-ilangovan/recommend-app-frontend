// React
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Components: Project
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

// Components: Local
import CardPreviewSlider from "../CardPreviewSlider/CardPreviewSlider";

// Styling: Local
import "./BoardPreview.css";

// Data
import { ROUTE } from "../../constants";

export default function BoardPreview({ boardId, boardName }) {
  return (
    <div>
      <div>
        <h5 className="inline-block-child">{boardName}</h5>
        <div className="inline-block-child">
          <Link to={ROUTE.BOARD.replace(":boardId", boardId)}>
            <FontAwesomeIcon className="chevron-icon" icon={faChevronRight} />
          </Link>
        </div>
      </div>
      <div>
        <CardPreviewSlider boardId={boardId} />
      </div>
    </div>
  );
}

BoardPreview.propTypes = {
  boardId: PropTypes.string,
  boardName: PropTypes.string,
};

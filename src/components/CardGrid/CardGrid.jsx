// React
import PropTypes from "prop-types";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Components: Local
import CardPreview from "../CardPreview/CardPreview";
import { useGetBoard } from "../../rqhooks/useGetBoard";

// Styling: Local
import "./CardGrid.css";

export default function CardGrid({ boardId }) {
  const cards = [];
  const { data, isSuccess } = useGetBoard(boardId);

  if (isSuccess) {
    for (const card of data?.data?.cards || {}) {
      cards.push(
        <Col key={card.id} className="recommend-grid-col card-grid-col">
          <div>
            <CardPreview key={card.id} {...card} />
          </div>
        </Col>,
      );
    }
  }

  return (
    <Container fluid className="recommend-page-container">
      <Row className="recommend-grid-row">{cards}</Row>
    </Container>
  );
}

CardGrid.propTypes = {
  boardId: PropTypes.string,
};

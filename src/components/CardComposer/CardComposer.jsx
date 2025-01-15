// React
import { useState } from "react";

// Components: Project
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Components: Local
import CardForm from "../CardForm/CardForm";
import CardEditForm from "../CardEditForm/CardEditForm";
import CardDetail from "../CardDetail/CardDetail";
import CardPreview from "../CardPreview/CardPreview";
import PropTypes from "prop-types";

export default function CardComposer({
  card,
  onSave,
  onCancel,
  mode = "create",
}) {
  // Default value
  const defaultCardData = {
    url: card.url,
    title: card.title,
    thumbnail: card.thumbnail,
    description: card.description,
  };

  // states
  const [cardData, setCardData] = useState(defaultCardData);

  function updateCardData(values) {
    if (values === null) {
      setCardData(defaultCardData);
    } else {
      const updataData = { ...cardData, ...values };
      setCardData(updataData);
    }
  }

  return (
    <Container fluid className="recommend-page-container">
      <Row className="recommend-grid-row">
        <Col md={6} className="recommend-grid-col">
          <div className="shadow recommend-form-box">
            <div className="recommend-form-header">
              <h3>{mode === "create" ? "Create a card" : "Edit the card"}</h3>
            </div>
            <div
              className={
                mode === "create" ? undefined : "recommend-component-hide"
              }
            >
              <CardForm card={card} onUpdate={updateCardData} />
            </div>

            <div
              className={
                mode === "create" ? "recommend-component-hide" : undefined
              }
            >
              <CardEditForm
                card={card}
                onSave={onSave}
                onCancel={onCancel}
                onUpdate={updateCardData}
              />
            </div>
          </div>
        </Col>

        <Col className="recommend-grid-col">
          <div className="recommend-form-header">
            <h5>Preview</h5>
          </div>
          <CardPreview
            id={card.id}
            title={cardData.title}
            thumbnail={cardData.thumbnail}
          />
        </Col>

        <Col className="recommend-grid-col">
          <div className="recommend-form-header">
            <h5>Final</h5>
          </div>
          <CardDetail {...cardData} />
        </Col>
      </Row>
    </Container>
  );
}

CardComposer.propTypes = {
  card: PropTypes.object,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  mode: PropTypes.string,
};

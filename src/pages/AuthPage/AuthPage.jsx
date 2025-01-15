import PropTypes from "prop-types";

// Components: Project
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Components: Local
import RecommendBrand from "../../components/RecommendBrand/RecommendBrand";

// Styling: Local
import "./AuthPage.css";

export default function AuthPage({ children }) {
  return (
    <Container fluid className="recommend-page-container">
      <Row className="recommend-grid-row">
        <Col className="recommend-grid-col auth-page-col">
          <div className="auth-page-brand-div">
            <RecommendBrand size="60px" />
          </div>
        </Col>
        <Col className="recommend-grid-col auth-page-col">
          <div className="shadow recommend-form-box">{children}</div>
        </Col>
      </Row>
    </Container>
  );
}

AuthPage.propTypes = {
  children: PropTypes.node,
};

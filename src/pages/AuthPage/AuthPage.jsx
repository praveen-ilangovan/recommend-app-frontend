// Components: Project
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Components: Local
import RecommendBrand from "../../components/RecommendBrand/RecommendBrand";

// Styling: Local
import "./AuthPage.css";

export default function AuthPage({children}) {
  return (
    <Container fluid className='auth-page-container'>
      <Row className='auth-page-row'>
        <Col className='auth-page-col'>
          <div className='auth-page-brand-div'>
            <RecommendBrand size="60px"/>
          </div>
        </Col>
        <Col className='auth-page-col'>
          <div className='shadow auth-page-form-box'>
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

// Components: Project
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Components: Local
import RecommendBrand from "../RecommendBrand/RecommendBrand";
import RegisterForm from "../RegisterForm/RegisterForm";

// Styling: Local
import "./RegisterPage.css";

export default function LoginPage() {
  return (
    <Container fluid>
      <Row className='register-page-row'>
        <Col className='register-page-col'>
          <RecommendBrand size="60px"/>
        </Col>
        <Col className='register-page-col'>
          <div className='register-page-form-div'>
            <div className='register-page-header'>
              <h3>Create an account</h3>
              <div className='signup-text'>
                <p>Already have an account? <a href="http://">Log in</a> </p>
              </div>
            </div>
            <RegisterForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

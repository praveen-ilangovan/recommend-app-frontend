// Components: Project
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Components: Local
import RecommendBrand from "../RecommendBrand/RecommendBrand";
import LoginForm from "../LoginForm/LoginForm";

// Styling: Local
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <Container fluid>
      <Row className='login-page-row'>
        <Col className='login-page-col'>
          <RecommendBrand size="60px"/>
        </Col>
        <Col className='login-page-col'>
          <div className='login-page-form-div'>
            <div className='login-page-header'>
              <h3>Log in</h3>
              <div className='signup-text'>
                <p>New to Recommend? <a href="http://">Sign up for free</a> </p>
              </div>
            </div>
            <LoginForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

// React
import { Link } from 'react-router-dom';

// Components: Local
import AuthPage from '../AuthPage/AuthPage';
import RegisterForm from "../../components/RegisterForm/RegisterForm";

// Styling: Local
import "../AuthPage/AuthPage.css";

export default function LoginPage() {
  return (
    <AuthPage>
      <div className='auth-page-header'>
        <h3>Create an account</h3>
        <div className='signup-text'>
          <p>Already have an account? <span></span>
            <Link to="/session/new">Log in</Link>
          </p>
        </div>
      </div>
      <div>
        <RegisterForm />
      </div>
    </AuthPage>
  );
}

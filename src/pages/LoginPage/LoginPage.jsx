// React
import { Link } from 'react-router-dom';

// Components: Local
import AuthPage from '../AuthPage/AuthPage';
import LoginForm from "../../components/LoginForm/LoginForm";

// Styling: Local
import "../AuthPage/AuthPage.css";

export default function LoginPage() {
  return (
    <AuthPage>
      <div className='auth-page-header'>
        <h3>Log in</h3>
        <div className='signup-text'>
          <p>New to Recommend? <span></span>
            <Link to="/users/new">Sign up for free</Link>
          </p>
        </div>
      </div>
      <div>
        <LoginForm />
      </div>
    </AuthPage>
  );
}

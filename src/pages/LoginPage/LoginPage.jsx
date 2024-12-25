// React
import { Link } from 'react-router-dom';

// Components: Local
import AuthPage from '../AuthPage/AuthPage';
import LoginForm from "../../components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <AuthPage>
      <div className='recommend-form-header'>
        <h3>Log in</h3>
        <div className='recommend-form-subtext-link'>
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

// React
import { Link } from 'react-router-dom';

// Components: Local
import AuthPage from '../AuthPage/AuthPage';
import RegisterForm from "../../components/RegisterForm/RegisterForm";

// Data
import { ROUTE } from '../../constants';

export default function LoginPage() {
  return (
    <AuthPage>
      <div className='recommend-form-header'>
        <h3>Create an account</h3>
        <div className='recommend-form-subtext-link'>
          <p>Already have an account? <span></span>
            <Link to={ROUTE.LOGIN}>Log in</Link>
          </p>
        </div>
      </div>
      <div>
        <RegisterForm />
      </div>
    </AuthPage>
  );
}

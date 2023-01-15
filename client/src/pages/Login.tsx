import { LoginInput, PasswordInput } from '../components/UserInfo';
import './LoginSignUp.modules.css';

export interface ISignUpProps {}

const Login: React.FunctionComponent<ISignUpProps> = (props) => {
    return (
        <div id="loginContainer">
            <p>Login</p>
            <LoginInput />
            <PasswordInput />
            <button type="submit" className="loginSignupButton">
                Login
            </button>
        </div>
    );
};

export default Login;

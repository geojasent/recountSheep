import { UserNameInput, PasswordInput, EmailInput } from '../components/UserInfo';
import './LoginSignUp.modules.css';

export interface ISignUpProps {}

const SignUp: React.FunctionComponent<ISignUpProps> = (props) => {
    return (
        <div id="signupContainer">
            <p>Sign up</p>
            <UserNameInput />
            <PasswordInput />
            <EmailInput />
            <button type="submit" className="loginSignupButton">
                Sign up
            </button>
        </div>
    );
};

export default SignUp;

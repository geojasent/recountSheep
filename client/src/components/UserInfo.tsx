import './UserInfo.modules.css';

export interface ISignUpProps {}

const UserNameInput: React.FunctionComponent<ISignUpProps> = (props) => {
    return (
        <div className="signupInfo">
            <span>Username</span>
            <input></input>
        </div>
    );
};

const LoginInput: React.FunctionComponent<ISignUpProps> = (props) => {
    return (
        <div className="signupInfo">
            <span>Username or Email</span>
            <input></input>
        </div>
    );
};

const PasswordInput: React.FunctionComponent<ISignUpProps> = (props) => {
    return (
        <div className="signupInfo">
            <span>Password</span>
            <input></input>
        </div>
    );
};
const EmailInput: React.FunctionComponent<ISignUpProps> = (props) => {
    return (
        <div className="signupInfo">
            <span>Email</span>
            <input></input>
        </div>
    );
};

export { UserNameInput, LoginInput, PasswordInput, EmailInput };

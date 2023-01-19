import { FormEvent, useState } from 'react';
import { FormWrapper } from '../components/FormWrapper';
import { UserNameInput, PasswordInput } from '../components/UserInfo';
import './LoginSignUp.modules.css';

export interface ILoginData {
    userName: string;
    userPassword: string;
    userEmail: string;
}

const INITIALUSERDATA: ILoginData = {
    userName: '',
    userPassword: '',
    userEmail: ''
};

const Login: React.FC = () => {
    const [userData, setUserData] = useState(INITIALUSERDATA);

    function updateFields(fields: Partial<ILoginData>) {
        setUserData((prev) => {
            return { ...prev, ...fields };
        });
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const body = userData;
            console.log(body);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div id="loginContainer">
            <FormWrapper title="Login">
                <form id="form" onSubmit={onSubmit}>
                    <UserNameInput {...userData} updateFields={updateFields} />
                    <PasswordInput {...userData} updateFields={updateFields} />
                    <button type="submit" className="loginSignupButton">
                        Login
                    </button>
                </form>
            </FormWrapper>
        </div>
    );
};

export default Login;

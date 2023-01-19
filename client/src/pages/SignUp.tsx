import { FormEvent, useState } from 'react';
import { FormWrapper } from '../components/FormWrapper';
import { UserNameInput, PasswordInput, EmailInput } from '../components/UserInfo';
import './LoginSignUp.modules.css';

export interface ISignUpData {
    userName: string;
    userPassword: string;
    userEmail: string;
}

const INITIALUSERDATA: ISignUpData = {
    userName: '',
    userPassword: '',
    userEmail: ''
};

const SignUp: React.FC = () => {
    const [userData, setUserData] = useState(INITIALUSERDATA);

    function updateFields(fields: Partial<ISignUpData>) {
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
        <div id="signupContainer">
            <FormWrapper title="Sign Up">
                <form id="form" onSubmit={onSubmit}>
                    <UserNameInput {...userData} updateFields={updateFields} />
                    <PasswordInput {...userData} updateFields={updateFields} />
                    <EmailInput {...userData} updateFields={updateFields} />
                    <button type="submit" className="loginSignupButton">
                        Sign up
                    </button>
                </form>
            </FormWrapper>
        </div>
    );
};

export default SignUp;

import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const body = userData;
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            console.log(body);
            //TODO: refine redirect for username taken
            if (response.status === 200) {
                navigate('/login');
            } else {
                throw new Error('Username is not available');
            }
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

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormWrapper } from '../components/FormWrapper';
import { UserNameInput, PasswordInput, EmailInput, ConfirmPasswordInput } from '../components/UserInfo';
import { useForm, FormProvider } from 'react-hook-form';
import './LoginSignUp.modules.css';

export interface ISignUpData {
    userName: string;
    userPassword: string;
    confirmPassword: string;
    userEmail: string;
}

const INITIALUSERDATA: ISignUpData = {
    userName: '',
    userPassword: '',
    confirmPassword: '',
    userEmail: ''
};

const SignUp: React.FC = () => {
    const [userData, setUserData] = useState(INITIALUSERDATA);
    const navigate = useNavigate();
    const methods = useForm();
    const {
        register,
        formState: { errors }
    } = methods;

    function updateFields(fields: Partial<ISignUpData>) {
        setUserData((prev) => {
            return { ...prev, ...fields };
        });
    }

    const onSubmit = async (data: any) => {
        try {
            const body = data;
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            response.json().then((res) => {
                console.log(res);
                if (res.userValid) {
                    navigate('/login');
                } else if (res.userEmailInvalid) {
                    alert('Please use a different email');
                } else {
                    alert('Username is unavailable');
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div id="signupContainer">
            <FormProvider {...methods}>
                <FormWrapper title="Sign Up">
                    <form id="form" onSubmit={methods.handleSubmit(onSubmit)}>
                        <UserNameInput {...register} {...userData} updateFields={updateFields} />
                        <PasswordInput {...register} {...userData} updateFields={updateFields} />
                        <ConfirmPasswordInput {...register} {...userData} updateFields={updateFields} />
                        <EmailInput {...register} {...userData} updateFields={updateFields} />
                        <button type="submit" className="loginSignupButton">
                            Sign up
                        </button>
                    </form>
                </FormWrapper>
            </FormProvider>
        </div>
    );
};

export default SignUp;

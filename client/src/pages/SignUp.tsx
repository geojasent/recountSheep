import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserNameInput, PasswordInput, EmailInput, ConfirmPasswordInput } from '../components/UserInfo';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import './Form.modules.css';

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
            const response = await fetch('https://api.recountsheep.com/signup', {
                method: 'POST',
                mode: 'cors',
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
        <section id="signupSection" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div id="loginSignupContainer">
                <FormProvider {...methods}>
                    <span id="loginSignupText">Sign up</span>
                    <form id="loginSignupForm" onSubmit={methods.handleSubmit(onSubmit)}>
                        <UserNameInput {...register} {...userData} updateFields={updateFields} />
                        <PasswordInput {...register} {...userData} updateFields={updateFields} />
                        <ConfirmPasswordInput {...register} {...userData} updateFields={updateFields} />
                        <EmailInput {...register} {...userData} updateFields={updateFields} />
                        <Button type="submit" className="loginSignupButton" variant="primary" style={{ marginTop: 10 }}>
                            Sign up
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </section>
    );
};

export default SignUp;

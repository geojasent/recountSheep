import { FormEvent, useState } from 'react';
import { FormWrapper } from '../components/FormWrapper';
import { UserNameInput, PasswordInput } from '../components/UserInfo';
import { useForm, FormProvider } from 'react-hook-form';
import './LoginSignUp.modules.css';

export interface ILoginData {
    userName: string;
    userPassword: string;
    confirmPassword: string;
    userEmail: string;
}

const INITIALUSERDATA: ILoginData = {
    userName: '',
    userPassword: '',
    confirmPassword: '',
    userEmail: ''
};

const Login: React.FC = () => {
    const [userData, setUserData] = useState(INITIALUSERDATA);
    const methods = useForm();
    const {
        register,
        formState: { errors }
    } = methods;

    function updateFields(fields: Partial<ILoginData>) {
        setUserData((prev) => {
            return { ...prev, ...fields };
        });
    }

    const onSubmit = async (data: any) => {
        try {
            let body = data;
            const response = await fetch('http://localhost:5000/login', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };
    // const onSubmit = async (e: FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         const body = userData;
    //         console.log(body);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    return (
        <div id="loginContainer">
            <FormProvider {...methods}>
                <FormWrapper title="Login">
                    <form id="form" onSubmit={methods.handleSubmit(onSubmit)}>
                        <UserNameInput {...userData} updateFields={updateFields} />
                        <PasswordInput {...userData} updateFields={updateFields} />
                        <button type="submit" className="loginSignupButton">
                            Login
                        </button>
                    </form>
                </FormWrapper>
            </FormProvider>
        </div>
    );
};

export default Login;

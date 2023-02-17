import { useState, useContext } from 'react';
import { UserNameInput, PasswordInput } from '../components/UserInfo';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserSessionContext } from '../components/SessionContext';
import Button from 'react-bootstrap/Button';
import './Form.modules.css';

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
    const setCurrentUser = useContext(UserSessionContext);
    const navigate = useNavigate();
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
            const response = await fetch('https://recountsheep-server.onrender.com/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            response.json().then((res) => {
                if (res.continueLogin) {
                    setCurrentUser.id = res.session.id;
                    sessionStorage.setItem('userId', res.session.id);
                    navigate('/viewdreams');
                } else {
                    alert('Username or password is incorrect');
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section id="loginSection" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div id="loginSignupContainer">
                <FormProvider {...methods}>
                    <span id="loginSignupText">Login</span>
                    <form id="loginSignupForm" onSubmit={methods.handleSubmit(onSubmit)}>
                        <UserNameInput {...userData} updateFields={updateFields} />
                        <PasswordInput {...userData} updateFields={updateFields} />
                        <Button type="submit" className="loginSignupButton" variant="primary" style={{ marginTop: 10 }}>
                            Login
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </section>
    );
};

export default Login;

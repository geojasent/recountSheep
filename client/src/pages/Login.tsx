import { useState, useContext } from 'react';
// import { FormWrapper } from '../components/FormWrapper';
import { UserNameInput, PasswordInput } from '../components/UserInfo';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserSessionContext } from '../components/SessionContext';
import Button from 'react-bootstrap/Button';
// import './login.modules.css';
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
            const response = await fetch('http://localhost:5000/login', {
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
        <div id="loginSignupContainer">
            <FormProvider {...methods}>
                {/* <FormWrapper title="Login"> */}
                <span id="loginSignupText">Login</span>
                <form id="loginSignupForm" onSubmit={methods.handleSubmit(onSubmit)}>
                    <UserNameInput {...userData} updateFields={updateFields} />
                    <PasswordInput {...userData} updateFields={updateFields} />
                    <div className="d-grid gap-2">
                        <Button type="submit" className="loginSignupButton" variant="secondary">
                            Login
                        </Button>
                    </div>
                </form>
                {/* </FormWrapper> */}
            </FormProvider>
        </div>
    );
};

export default Login;

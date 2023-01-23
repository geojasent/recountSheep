import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormWrapper } from '../components/FormWrapper';
import { UserNameInput, PasswordInput, EmailInput, ConfirmPasswordInput } from '../components/UserInfo';
import { useForm, FormProvider } from 'react-hook-form';
import { ValidateField } from '../components/SignupFormErrors';
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
    // const [validationData, setValidationData] = useState(INITIALVALIDATIONDATA);

    function updateFields(fields: Partial<ISignUpData>) {
        setUserData((prev) => {
            return { ...prev, ...fields };
        });
    }
    // function updateValidation(fields: Partial<IValidationData>) {
    //     setValidationData((prev) => {
    //         return { ...prev, ...fields };
    //     });
    // }
    const methods = useForm();
    const {
        register,
        formState: { errors }
    } = methods;
    const navigate = useNavigate();
    const onSubmit = async (data: any) => {
        // console.log(data);
        try {
            const body = data;
            // const response = await fetch('http://localhost:5000/signup', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(body)
            // });
            console.log(userData);
            console.log(body);
            //TODO: refine redirect for username taken
            // if (response.status === 200) {
            //     navigate('/login');
            // } else {
            //     throw new Error('Username is not available');
            // }
        } catch (err) {
            console.log(err);
        }
    };

    // const onSubmit = async (e: FormEvent) => {
    //     e.preventDefault();
    //     ValidateField({ ...userData });
    //     try {
    //         const body = userData;
    //         // const response = await fetch('http://localhost:5000/signup', {
    //         //     method: 'POST',
    //         //     headers: { 'Content-Type': 'application/json' },
    //         //     body: JSON.stringify(body)
    //         // });
    //         console.log(body);
    //         //TODO: refine redirect for username taken
    //         // if (response.status === 200) {
    //         //     navigate('/login');
    //         // } else {
    //         //     throw new Error('Username is not available');
    //         // }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // const onChange = (e: FormEvent) => {
    //     setUserData({ ...userData, [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value });
    // };

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

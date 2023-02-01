import './UserInfo.modules.css';
import { useFormContext } from 'react-hook-form';

interface ILoginSignUpData {
    userName: string;
    userPassword: string;
    confirmPassword: string;
    userEmail: string;
}

interface LoginSignUpProps extends ILoginSignUpData {
    updateFields: (fields: Partial<ILoginSignUpData>) => void;
}

export function UserNameInput({ userName, updateFields }: LoginSignUpProps) {
    const { register, formState } = useFormContext();
    return (
        <>
            <span className="userInputText">Username</span>
            <input
                {...register('userName', {
                    required: true,
                    minLength: 3
                })}
                onChange={(e) => {
                    updateFields({ userName: e.target.value });
                }}
                className="userNameInput"
            ></input>
            {formState.errors.userName && <p className="errorMsg">Username must be at least 3 characters.</p>}
        </>
    );
}

export function PasswordInput({ userPassword, updateFields }: LoginSignUpProps) {
    const { register, formState } = useFormContext();

    return (
        <>
            <span className="userInputText">Password</span>
            <input
                {...register('userPassword', {
                    required: true,
                    minLength: 6
                })}
                onChange={(e) => {
                    updateFields({ userPassword: e.target.value });
                }}
                className="userPassword"
                type="password"
            ></input>
            {formState.errors.userPassword && <p className="errorMsg">Password must be at least 6 characters.</p>}
        </>
    );
}

export function ConfirmPasswordInput({ confirmPassword, updateFields }: LoginSignUpProps) {
    const { register, formState, watch } = useFormContext();

    return (
        <>
            <label className="userInputText">Confirm Password</label>
            <input
                {...register('confirmPassword', {
                    required: true,
                    validate: (value) => value === watch('userPassword')
                })}
                onChange={(e) => {
                    updateFields({ confirmPassword: e.target.value });
                }}
                className="confirmUserPassword"
                type="password"
            ></input>
            {formState.errors.confirmPassword && <p className="errorMsg">Password must match.</p>}
        </>
    );
}
export function EmailInput({ userEmail, updateFields }: LoginSignUpProps) {
    const { register, formState } = useFormContext();

    return (
        <>
            <label className="userInputText">Email</label>
            <input
                {...register('userEmail', {
                    required: true,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                })}
                onChange={(e) => {
                    updateFields({ userEmail: e.target.value });
                }}
                className="userEmail"
            ></input>
            {formState.errors.userEmail && <p className="errorMsg">Enter a valid email.</p>}
        </>
    );
}

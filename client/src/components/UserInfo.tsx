import './UserInfo.modules.css';

interface ILoginSignUpData {
    userName: string;
    userPassword: string;
    userEmail: string;
    // userRole: string;
}

interface LoginSignUpProps extends ILoginSignUpData {
    updateFields: (fields: Partial<ILoginSignUpData>) => void;
}

export function UserNameInput({ userName, updateFields }: LoginSignUpProps) {
    return (
        <>
            <label>Username</label>
            <input
                className="userNameInput"
                onChange={(e) => {
                    updateFields({ userName: e.target.value });
                }}
            ></input>
        </>
    );
}

export function PasswordInput({ userPassword, updateFields }: LoginSignUpProps) {
    return (
        <>
            <label>Password</label>
            <input
                className="userPassword"
                onChange={(e) => {
                    updateFields({ userPassword: e.target.value });
                }}
            ></input>
        </>
    );
}
export function EmailInput({ userEmail, updateFields }: LoginSignUpProps) {
    return (
        <>
            <label>Email</label>
            <input
                className="userEmail"
                onChange={(e) => {
                    updateFields({ userEmail: e.target.value });
                }}
            ></input>
        </>
    );
}

// move to subscribe page
// export function userRoleChange({ userRole: updateFields }: LoginSignUpProps) {
//     return <></>;
// }

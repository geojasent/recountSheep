interface IFormErrorsData {
    userName: string;
    userPassword: string;
    confirmPassword: string;
    userEmail: string;
    formErrors: { user: string; email: string; password: string };
    userValid: boolean;
    emailValid: boolean;
    passwordValid: boolean;
    formValid: boolean;
}

interface FormErrorsData extends IFormErrorsData {
    updateFields: (fields: Partial<IFormErrorsData>) => void;
}

export function ValidateField(props: any) {
    // const { onChange, ...inputProps } = props;
    // console.log(inputProps);
    // if (props.userName !==) {
    //     console.log('username')
    // }
    // if (props.userPassword) {
    //     console.log('passwords not the same')
    // }
    // if (props.userPassword !== props.confirmPassword) {
    //     console.log('passwords not the same')
    // }
    // if (props.userEmail) {
    // }
}

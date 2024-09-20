// Components
import RecoverPasswordForm from "./component/recover-password-form";

// Styles
import { SignInContainer } from "./recover-password.style";

const RecoverPassword = () => {
    return (
        <SignInContainer>
            <RecoverPasswordForm />
        </SignInContainer>
    );
};

export default RecoverPassword;

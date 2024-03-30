import { ErrorAlert } from "./ErrorAlert";

export default function ErrorFromFirebase({ error }) {
    var message = "Unexpected error " + error.code + ": " + error.message;

    switch (error.code) {
        case "auth/invalid-email":
            message = "Invalid Phone Number";
            break;
        case "auth/email-already-in-use":
            message = "Already Exist";
            break;
        case "auth/invalid-phone-number":
            message = "Invalid Phone Number";
            break;
        case "auth/invalid-verification-code":
            message = "Invalid OTP";
            break;
        case "auth/wrong-password":
            message = "Wrong Password";
            break
        case "auth/missing-password":
            message = "Enter Password";
            break
        case "auth/user-not-found":
            message = "Create Account First";
            break
        case "auth/account-exists-with-different-credential":
            message = "try with Other PhoneNumber";
            break
        case "auth/missing-code":
            message = "Please Enter OTP";
            break;
        case "auth/invalid-credential":
            message = "User Has Not Account please Create Account";
            break;
        default:
            break;
    }

    return <ErrorAlert
        message={message}
    />
}
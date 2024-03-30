

import { useContext, useReducer, useState } from "react";
import { auth } from "../../FirebaseHelpers/firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import LoadingSpinner from "../GenericComponents/LoadingSpinner";
import ErrorFromFirebase from "../GenericComponents/FirebaseErrorMessage";
import { AuthContext } from "../../Auth";
import CheckCurrentUser from "./CheckCurrentUser";
import { useNavigate } from "react-router-dom";
import Button from "../GenericComponents/Button";

export function SignUpWithEmail() {
    const [error, setError] = useState(undefined);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate()


    const loginWithEmailID = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await auth.signOut();
            setIsLoading(false)
            setSuccess(true)
        }
        catch (e) {
            console.log(e);
            setError(e);
        }
    }

    const handleloginWithEmail = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        if (form.checkValidity() === true) {
            setIsLoading(true);
            await loginWithEmailID();
        } else {
            form.classList.add('was-validated')
        }
    }

    if (error) {
        return <ErrorFromFirebase error={error} />
    }

    if (isLoading) {
        return <LoadingSpinner />
    }
    if (success) {
        return <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Register Successfully</p>
        </div>
    }

    return (
        <div className="flex justify-center items-center h-96">
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Register With Ticket Management</p>
                <form
                    onSubmit={handleloginWithEmail}
                    data-te-validation-init
                    className="flex flex-col gap-4"
                >

                    <div className="relative">
                        <input
                            required={true}
                            type={'email'}
                            onChange={(e) => setemail(e.target.value)}
                            className="border mt-4 mb-4 text-white text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 "
                            placeholder={"Please Enter Email"}
                            defaultValue={email}
                        />
                        <input
                            required={true}
                            type={'password'}
                            onChange={(e) => setpassword(e.target.value)}
                            className="border mt-4 mb-4 text-white text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 "
                            placeholder={"Please Enter Password"}
                            defaultValue={password}
                        />
                    </div>
                    <div className="flex justify-between">
                        <Button
                            buttonName={"Register"}
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

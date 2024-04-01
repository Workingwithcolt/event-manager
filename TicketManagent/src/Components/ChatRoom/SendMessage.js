import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { auth, db } from "../../FirebaseHelpers/firebase-config";
import { UserContext } from "../Contexts/CurrentUserContext";
import Button from "../GenericComponents/Button";

const SendMessage = ({ scroll, path, currentUserId }) => {
    const { currentUserAdmin } = useContext(UserContext);

    const [message, setMessage] = useState("");

    const name = currentUserAdmin?.currentUser["Full Name"]

    const sendMessage = async (event) => {
        event.preventDefault();
        const { uid, displayName, photoURL } = auth.currentUser;

        await addDoc(collection(db, path), {
            text: message,
            currentUserId: currentUserId,
            createdAt: serverTimestamp(),
            uid,
            name: (name) || "user"
        });
        setMessage("");
        scroll.current.scrollIntoView({ behavior: "smooth" });

    };

    return (
        <form onSubmit={sendMessage} className="flex flex-row justify-between gap-2 px-1">
            <div className="flex-1">
                <input
                    value={message}
                    required={true}
                    type={"text"}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border mt-4 mb-4 text-white text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 "
                    placeholder={"type message...."}
                    defaultValue={message}
                />
            </div>
            <button
                type="submit"
                className="text-white w-20 h-10 m-auto items-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm p-2 mx-auto dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >Send</button>
        </form>
    );
};
export default SendMessage;
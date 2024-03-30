import React, { useContext } from "react";
import { auth } from "../../FirebaseHelpers/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import { RiMessage2Line } from "react-icons/ri";
import { AuthContext } from "../../Auth";
const Message = ({ message }) => {
    const currentAuthContext = useContext(AuthContext);
    const uid = currentAuthContext.currentUserObject.uid;
    const [user] = useAuthState(auth);
    let msgpostion = uid == message.uid ? "flex flex-row-reverse" : "flex";
    return (
        <div className={"bg-slate-400 p-2 " + msgpostion}>
            <div className={`bg-blue-400 mb-1 rounded-xl p-2 h-auto max-w-48`}>
                <span class=" text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5  me-2 dark:bg-gray-700 dark:text-gray-400 border border-blue-400">
                    {message?.name || "user"}
                </span>
                <div className="ml-3 text-sm break-all font-normal text-wrap ">{message.text}</div>
            </div>
        </div>
    );
};
export default Message;
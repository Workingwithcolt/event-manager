import { useContext } from "react";
import { AuthContext } from "../../Auth";
import { endpoints } from "../../FirebaseHelpers/ApiInterface";
import { UserContext } from "../Contexts/CurrentUserContext";
import { PENDING, checkAdmin, checkAssistant } from "../../Helper/helper";
import DataView from "../GenericComponents/DataView";
import { IssueCard } from "../Issue/IssueCard";
import { AssignIssueDetail } from "./AssignIssueDetail";

function DataReceiver({ queryData }) {
    const currentAuthContext = useContext(AuthContext);
    const { currentUserAdmin } = useContext(UserContext);

    const queryKey = [currentAuthContext.currentUserObject.uid, PENDING]

    var databaseQuery = undefined

    let isAdmin = checkAdmin(currentUserAdmin.currentUser.Access)
    let isAssistant = checkAssistant(currentUserAdmin.currentUser.Access)

    if (isAdmin) {
        databaseQuery = [['status', "==", PENDING]]
    } else if (isAssistant) {
        databaseQuery = [['status', "==", PENDING], ['Assign', '==', currentAuthContext.currentUserObject.uid]]
    } else {
        databaseQuery = [['status', '==', PENDING], ['createdBy', '==', currentAuthContext.currentUserObject.uid]]
    }

    const queryFunction = async () => {
        return await endpoints.Issue.getAllDocument(databaseQuery)

    };

    const getValueToSearch = (current) => {
        return (
            current.Subject
        )
    }
    return (
        <section className='h-full flex flex-col bg-gray-900 text-white py-4 px-8'>
            <div className='py-4'>
                <p className=" text-4xl font-extrabold tracking-tight mt-2 mb-2 text-white">Manage Tickets</p>
            </div>
            <div className='flex-1'>
                <DataView
                    queryFunction={queryFunction}
                    queryKey={queryKey}
                    getSearchableValue={getValueToSearch}
                    Card={IssueCard}
                    DetailedElement={AssignIssueDetail}
                />
            </div>
        </section>
    )
}

export const AssignIssue = () => {
    const { currentUserAdmin } = useContext(UserContext);
    if (!(currentUserAdmin?.name === "")) {
        return (
            <DataReceiver queryData={currentUserAdmin} />
        )
    } else {
        return <p className=" text-center flex item-center font-normal text-gray-700 dark:text-gray-400 ">
            Please Create Corporation or Create New User Account first then if you want to apply for the Technical Support you can join Corporation
        </p>
    }
}
import { useContext } from "react";
import { AuthContext } from "../../Auth";
import { ISSUE, endpoints } from "../../FirebaseHelpers/ApiInterface";
import { PENDING, checkAdmin } from "../../Helper/helper";
import { UserContext } from "../Contexts/CurrentUserContext";
import DataView from "../GenericComponents/DataView"
import { NavLink } from "react-router-dom";
import { IssueCard } from "./IssueCard";
import { IssueDetail } from "./IssueDetail";

const DataReceiver = () => {
    const currentAuthContext = useContext(AuthContext);
    const { currentUserAdmin } = useContext(UserContext);
    const queryKey = [currentAuthContext.currentUserObject.uid, ISSUE, PENDING]

    var databaseQuery = undefined
    let isAdmin = checkAdmin(currentUserAdmin.currentUser.Access)

    if (isAdmin) {
        databaseQuery = [['status', "==", PENDING]]
    } else {
        databaseQuery = [['status', "==", PENDING], ["createdBy", "==", currentAuthContext.currentUserObject.uid]]
    }

    const queryFunction = async () => {
        return await endpoints.Issue.getAllDocument(databaseQuery)

    };

    const getValueToSearch = (current) => {

        return (
            current.Subject
            +
            current.taskid
        )
    }

    return (
        <section className='h-full flex flex-col bg-gray-900 text-white py-4 px-8'>
            <div className='py-4'>
                <p className=" text-4xl font-extrabold tracking-tight mt-2 mb-2 text-white">All Tickets</p>
            </div>
            <div className='flex-1'>
                <DataView
                    queryFunction={queryFunction}
                    queryKey={queryKey}
                    getSearchableValue={getValueToSearch}
                    Card={
                        IssueCard
                    }
                    DetailedElement={IssueDetail}
                    newDataButton={
                        <NavLink to={`/Issueform/${currentUserAdmin.currentUser.id}`} type='button' className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800">
                            Add New Tickets
                        </NavLink>
                    }
                />
            </div>
        </section>
    )
}
export const ShowIssues = () => {
    const { currentUserAdmin } = useContext(UserContext);
    if (!(currentUserAdmin?.name === "")) {
        return (
            <DataReceiver queryData={currentUserAdmin} />
        )
    } else {
        return <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Please Create Corporation or Create User
        </h5>
    }
}
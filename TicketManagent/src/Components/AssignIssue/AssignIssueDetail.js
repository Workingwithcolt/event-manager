import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ISSUE, endpoints } from "../../FirebaseHelpers/ApiInterface";
import CardRow from "../GenericComponents/CardRow";
import LoadingSpinner from "../GenericComponents/LoadingSpinner";
import { useContext, useState } from "react";
import { ACCEPTED, ASSISTAND_LEVEL_NAME, ASSISTANT_LEVEL_ID, PENDING, checkAdmin, checkAssistant } from "../../Helper/helper";
import Button from "../GenericComponents/Button";
import { UserContext } from "../Contexts/CurrentUserContext";
import { GenericSelect } from "../GenericComponents/GenericSelect";
import { ErrorAlert } from "../GenericComponents/ErrorAlert";
import { NavLink, useNavigate } from "react-router-dom";

export const AssignIssueDetail = ({ item }) => {
    const { currentUserAdmin } = useContext(UserContext);
    const [Error, setError] = useState("");
    const [alocateManager, setAlocateManager] = useState("");
    const [loading, isLoading] = useState(false)
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    let isAdmin = checkAdmin(currentUserAdmin.currentUser.Access)
    let isAssistant = checkAssistant(currentUserAdmin.currentUser.Access)
    let databaseQuery = undefined
   
    if (isAdmin) {
        var companyId = currentUserAdmin.currentUser.Access[0].CorporationId
        databaseQuery = [[companyId, "==", ACCEPTED]]
    } else if (isAssistant) {

    }

    const doneTask = async () => {
        try {
            isLoading(true)
            item.status = ACCEPTED;
            await endpoints.Issue.updateDocument(item.id, item);
            const InvalidateUser = async () => {
                await queryClient.invalidateQueries({
                    predicate: (query) => query.queryKey.includes(PENDING),
                })
            }
            InvalidateUser();
            isLoading(false)
            navigate("/home")
        } catch (e) {
            setError(e.message)

        }
    }

    const Assign = async () => {
        if (alocateManager !== "") {
            let parsedValue = JSON.parse(alocateManager).value;
            if (parsedValue && item.Assign === undefined) {
                try {
                    isLoading(true)
                    item.Assign = parsedValue.id;
                    await endpoints.Issue.updateDocument(item.id, item);
                    const InvalidateUser = async () => {
                        await queryClient.invalidateQueries({
                            predicate: (query) => query.queryKey.includes(ISSUE),
                        })
                    }
                    InvalidateUser();
                    isLoading(false)
                    navigate("/home")
                } catch (e) {
                    setError(e.message)

                }
            } else {
                setError("It is Already Being Assign")
            }
        } else {
            setError("please Select TechSupport To Assign")

        }
    }

    const { data, error, isError, isLoading: startLoading } = useQuery({
        queryFn: async () => {
            let result = await endpoints.users.getAllDocument(databaseQuery)

            let newResult = []
            if (companyId) {
                result.forEach((element) => {
                    return element.Access.forEach(AccessObject => {
                        if (AccessObject.levelID === ASSISTANT_LEVEL_ID && companyId === AccessObject.CorporationId) {
                            newResult.push({
                                value: element,
                                label: element['Full Name']
                            })
                        }
                    })
                })
            }
            return newResult
        }, queryKey: [ASSISTAND_LEVEL_NAME]
    })

    if (loading || startLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return (
            <div className="flex flex-col p-2">
                <div className="p-4 mb-4 text-sm text-white text-center rounded-lg bg-gray-700" role="alert">
                    {error.message}
                </div>
            </div>
        )
    }

    return (
        <><div className="block w-full p-6 bg-gray-700 border border-gray-200 rounded-lg shadow gap-4">
            <ul>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.Subject}
                </h5>
                <CardRow
                    name={"status"}
                    value={item.status}
                />
                <div className="font-bold">Description</div>
                <p className="font-normal text-gray-400 dark:text-gray-400">
                    {item.Description}
                </p>
                {
                    isAdmin &&
                    <div className="mb-2">
                        <GenericSelect
                            id="Select_TechSupport"
                            currentValue={alocateManager}
                            opt={data}
                            title="Assign TechSupport"
                            handleClick={(e) => setAlocateManager(e.target.value)}
                        />
                    </div>
                }
            </ul>
            <div className="flex flex-row gap-2 mx-2">
                <NavLink to={`/chatBox/${item.id}/${currentUserAdmin.currentUser.id}`} type='button' className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800">
                    Chat
                </NavLink>
                <Button
                    buttonName={"Resolve"}
                    type={"button"}
                    onPress={doneTask}
                    disable={loading}
                />
                {
                    isAdmin && <Button
                        buttonName={"Assign"}
                        type={"button"}
                        onPress={Assign}
                        disable={loading}
                    />}
            </div>
            <div className="mt-2">
                {
                    Error !== "" &&
                    <ErrorAlert message={Error} />
                }
            </div>
        </div></>
    )
}
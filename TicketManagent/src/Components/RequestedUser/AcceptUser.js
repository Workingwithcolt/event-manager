import { useContext } from "react"
import { ACCEPTED } from "../../Helper/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { USERS, endpoints } from "../../FirebaseHelpers/ApiInterface";
import LoadingSpinner from "../GenericComponents/LoadingSpinner";
import Button from "../GenericComponents/Button";
import { UserContext } from "../Contexts/CurrentUserContext";

export const AcceptUser = ({ item }) => {
    const { currentUserAdmin } = useContext(UserContext);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    var companyId = currentUserAdmin.currentUser.Access[0].CorporationId;

    const querryFunction = async () => {
        let newItem = item;
        for (let i = 0; i < item.Access.length; i++) {
            if (item.Access[i].CorporationId === companyId) {
                newItem.Access[i].status = ACCEPTED;
            }
        }
        newItem[companyId] = ACCEPTED

        await endpoints.users.updateDocument(item.id, newItem)
    }

    const handleRedirect = (navigateTo) => {
        navigate(navigateTo);
    };


    const handleSubmit = () => {
        mutate()
    }

    const { isLoading, error, mutate, isSuccess } = useMutation(
        async () => await querryFunction(),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    predicate: (query) => query.queryKey.includes(USERS),
                });
            },
        }
    );

    if (isLoading) {
        return (
            <div className="flex w-full h-full justify-center items-center">
                <LoadingSpinner />
            </div>
        )
    }

    if ((error) && (error !== "")) {
        return (
            <div className="flex flex-col p-2">
                <div className="p-4 mb-4 text-sm text-white text-center rounded-lg bg-gray-700" role="alert">
                    {error.message}
                </div>
                <button onClick={() => handleRedirect("/home")}>
                    ok
                </button>
            </div>

        );
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col p-2">
                <div className="p-4 mb-4 text-sm text-white text-center rounded-lg bg-gray-700" role="alert">
                    Updated Succcessfully !!
                </div>
                <button onClick={() => handleRedirect("/home")}>
                    ok
                </button>
            </div>
        )
    }

    return (
        <>
            <div className='bg-gray-900 px-2 flex flex-col gap-4'>
                <div className="font-sans">Accept Application for Technical Staff</div>
                <Button buttonName={"Accept Application"} onPress={handleSubmit} type={"button"} />
            </div>
        </>
    )
}
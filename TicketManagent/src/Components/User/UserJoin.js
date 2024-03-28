import { useContext } from "react";
import { AuthContext } from "../../Auth";
import { USERS, endpoints } from "../../FirebaseHelpers/ApiInterface"
import { JoinForm } from "../../Helper/Extraproperties";
import { ASSISTAND_LEVEL_NAME, ASSISTANT_LEVEL_ID, PENDING, USER_USER_LEVEL_ID, USER_USER_LEVEL_NAME, deepCopyObject, returnCurrentCompany } from "../../Helper/helper";
import ChangeEndpoints from "../GenericComponents/ChangeEndPoint";
import { useQuery } from "@tanstack/react-query";
import { CURRENTUSER } from "./UserConstants";
import LoadingSpinner from "../GenericComponents/LoadingSpinner";

export const Userjoin = () => {
    const currentAuthContext = useContext(AuthContext);
    let uid = currentAuthContext.currentUserObject.uid;

    var { data, isLoading } = useQuery([uid, CURRENTUSER],
        async () => await endpoints.users.getDocument(uid));


    if (isLoading) {
        return <LoadingSpinner />
    }

    const joinUser = async (state) => {

        state.Access = {}

        let CompanyInfo = await returnCurrentCompany(endpoints, state.UniqueId);


        if (Object.keys(CompanyInfo).length === 0) return Promise.reject("Company Does not Exist")

        if (Object.keys(data).length === 0) return Promise.reject("First Create User")

        if (data?.Access && data?.Access.length > 0) {
            for (let i = 0; i < data.Access.length; i++) {
                if (data.Access[i].CorporationId === state.UniqueId) {
                    return Promise.reject("User is already join")
                }
            }
        }

        if (data?.Access) {
            state.Access = deepCopyObject(data.Access);
        }
        if (!state.Access) {
            state.Access = []
        }
        state.Access.push({
            CorporationId: state.UniqueId,
            level: USER_USER_LEVEL_NAME,
            levelID: USER_USER_LEVEL_ID,
            status: PENDING
        })
        state.Access.push({
            level: ASSISTAND_LEVEL_NAME,
            levelID: ASSISTANT_LEVEL_ID,
            status: PENDING,
            CorporationId: state.UniqueId
        })
        state[state.UniqueId] = PENDING
        delete state.UniqueId
        let result = await endpoints.users.updateDocument(uid, state);
        window.location.reload(true);
        return result;
    }

    return (
        <section className='h-full bg-gray-900 py-8 px-8 text-white'>
            <ChangeEndpoints
                formName={"New User Form"}
                addButtonText={"Add new User"}
                currentData={{}}
                querryFunction={joinUser}
                propertyList={JoinForm}
                queryKeyValue={USERS}
                navigateTo="/"
            />
        </section>
    )
}

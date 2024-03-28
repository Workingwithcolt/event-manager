import { useParams } from "react-router-dom";
import { ISSUE, endpoints } from "../../FirebaseHelpers/ApiInterface";
import { Tickets } from "../../Helper/Extraproperties"
import { PENDING } from "../../Helper/helper";
import ChangeEndpoints from "../GenericComponents/ChangeEndPoint"

export const IssueForm = () => {
    let { id } = useParams();
    const addIssue = async (state) => {
        state.status = PENDING
        state.createdBy = id;   
        return await endpoints.Issue.addDocument(state)
    }
    return (
        <section className='h-full bg-gray-900 py-8 px-8 text-white'>
            <ChangeEndpoints
                formName={"Issue Form"}
                addButtonText={"Add new Issue"}
                currentData={{}}
                querryFunction={addIssue}
                propertyList={Tickets}
                queryKeyValue={ISSUE}
                navigateTo="/home"
            />
        </section>
    )
}
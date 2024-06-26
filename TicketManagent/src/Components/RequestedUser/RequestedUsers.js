import React, { useContext } from 'react'
import DataView from '../GenericComponents/DataView'
import { USERS, endpoints } from '../../FirebaseHelpers/ApiInterface';
import { AuthContext } from '../../Auth';
import { UserContext } from '../Contexts/CurrentUserContext';
import { PENDING, checkAdmin } from '../../Helper/helper';
import RequestedCard from './RequestedCard';
import { AcceptUser } from './AcceptUser';


function DataReceiver({ queryData }) {

  const currentAuthContext = useContext(AuthContext);
  const queryKey = [currentAuthContext.currentUserObject.uid, USERS, PENDING]
  var databaseQuery = undefined
  const queryFunction = async () => {
    let isAdmin = checkAdmin(queryData.currentUser.Access)
    if (isAdmin) {
      databaseQuery = [[`${queryData.currentUser.Access[0].CorporationId}`, "==", PENDING]]
    }
    return await endpoints.users.getAllDocument(databaseQuery)
  };

  const getValueToSearch = (current) => {
    return (
      current["Full Name"]
    )
  }
  return (
    <section className='h-full flex flex-col bg-gray-900 text-white py-4 px-8'>
      <div className='py-4'>
        <p className=" text-4xl font-semibold tracking-tight mt-2 mb-2 text-white">Requested Application for Tech Support</p>
      </div>
      <div className='flex-1'>
        <DataView
          queryFunction={queryFunction}
          queryKey={queryKey}
          getSearchableValue={getValueToSearch}
          Card={RequestedCard}
          DetailedElement={AcceptUser}
        />
      </div>
    </section>
  )
}

function RequestedUsers() {
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
export default RequestedUsers;
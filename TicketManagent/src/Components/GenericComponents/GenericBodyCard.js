import React, { useContext, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { AuthContext } from '../../Auth';
import { useQuery } from '@tanstack/react-query';
import { endpoints } from '../../FirebaseHelpers/ApiInterface';
import { UserContext } from '../Contexts/CurrentUserContext';
import { CURRENTUSER } from '../User/UserConstants';

const CurrentUser = ({ company, SelectCompany, currentAuthContext }) => {
    const { setCurrentUserAdmin, currentUserAdmin } = useContext(UserContext)
    let uid = currentAuthContext?.currentUserObject?.uid;

    var { data } = useQuery(
        [uid, CURRENTUSER],
        async () => await endpoints.users.getDocument(uid));


    if (data?.Access && (currentUserAdmin.name === '')) {
            setCurrentUserAdmin({
                currentUser: data,
                selectedCompany: data
            })
    }

}
export default function GenericBodyCard({ children }) {
    const [company, SelectCompany] = useState(undefined)
    const currentAuthContext = useContext(AuthContext)

    return (
        <div className='flex flex-col h-screen'>
            <Header />
            {currentAuthContext?.currentUserObject?.uid && <CurrentUser company={company} SelectCompany={SelectCompany} currentAuthContext={currentAuthContext} />}
            <main className='flex-1'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

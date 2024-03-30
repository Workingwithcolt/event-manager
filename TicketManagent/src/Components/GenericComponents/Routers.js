import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../userProfile/LoginPage'
import { Home } from './Home'
import GenericBodyCard from './GenericBodyCard'
import { SignOut } from '../userProfile/SignOut'
import { Userjoin } from '../User/UserJoin'
import { CreateCompany } from '../User/CreateCompany'
import { CreateUser } from '../User/CreateUser'
import RequestedUsers from '../RequestedUser/RequestedUsers'
import { ShowIssues } from '../Issue/ShowIssues'
import { IssueForm } from '../Issue/IssueForm'
import { AssignIssue } from '../AssignIssue/AssignIssue'
import { ChatBox } from '../ChatRoom/Chatbox'
import { LoginWithEmail } from '../userProfile/LoginWithEmail'
import { SignUpWithEmail } from '../userProfile/SignUpWithEmail'

function Routers() {
    return (
        <Routes>
            <Route path='/home'
                element={
                    <GenericBodyCard>
                        <Home />
                    </GenericBodyCard>} />

            <Route path='/'
                element={
                    <LoginWithEmail />
                } />

            <Route path='/signup'
                element={
                    <SignUpWithEmail />
                } />
            <Route path='/chatBox/:tokenId/:currentUserId'
                element={
                    <GenericBodyCard>
                        <ChatBox />
                    </GenericBodyCard>
                } />

            <Route path='/createUser' element={
                <GenericBodyCard>
                    <CreateUser />
                </GenericBodyCard>
            } />

            <Route path='/createCompany' element={
                <GenericBodyCard>
                    <CreateCompany />
                </GenericBodyCard>
            } />
            <Route path='/joinCompany' element={
                <GenericBodyCard>
                    <Userjoin />
                </GenericBodyCard>
            } />

            <Route path='/RequestedUser' element={
                <GenericBodyCard>
                    <RequestedUsers />
                </GenericBodyCard>
            } />

            <Route path='/Issueform/:id' element={
                <GenericBodyCard>
                    <IssueForm />
                </GenericBodyCard>
            } />


            <Route path='/Issues' element={
                <GenericBodyCard>
                    <ShowIssues />
                </GenericBodyCard>
            } />
            <Route path='/AssignIssue' element={
                <GenericBodyCard>
                    <AssignIssue />
                </GenericBodyCard>
            } />

            <Route path='/signOut'
                element=
                {<SignOut />} />
        </Routes>
    )
}

export default Routers
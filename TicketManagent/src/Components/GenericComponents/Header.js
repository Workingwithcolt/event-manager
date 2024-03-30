import { NavLink, useLocation } from 'react-router-dom'
import { SignOut } from '../userProfile/SignOut'
import { FaUsersRays } from "react-icons/fa6";
import { GrProjects } from "react-icons/gr";
import { IoIosNotifications } from "react-icons/io";
import { BsClipboardMinus } from "react-icons/bs";
import { MdOutlineManageSearch } from "react-icons/md";
import { UserContext } from '../Contexts/CurrentUserContext';
import { useContext } from 'react';
import { checkAdmin } from '../../Helper/helper';

function Header() {
    const { pathname } = useLocation();
    const { currentUserAdmin } = useContext(UserContext);
    let isAdmin = checkAdmin(currentUserAdmin?.currentUser?.Access)
    
    return (
        <nav className="bg-gray-900 border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <NavLink to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-base font-semibold whitespace-nowrap text-white">Ticket Manager</span>
                </NavLink>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <ul className="flex font-sm px-4 mr-4 text-white space-x-2 gap-4">
                        {
                            isAdmin &&
                            <li>
                                <NavLink to="/RequestedUser">
                                    <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
                                        <IoIosNotifications size={25} color={pathname === '/RequestedUser' ? '#3B82F6' : undefined} />
                                        Notification
                                    </span>
                                </NavLink>
                            </li>
                        }
                        <li>
                            <NavLink to="/Issues">
                                <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
                                    <BsClipboardMinus size={25} color={pathname === '/Issues' ? '#3B82F6' : undefined} />
                                    Tickets
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/AssignIssue">
                                <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
                                    <MdOutlineManageSearch size={25} color={pathname === '/Issues' ? '#3B82F6' : undefined} />
                                    Manage
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                    <div
                        type="button"
                        className="flex text-white rounded-full items-center justify-center w-8 h-8"
                    >
                        <SignOut />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
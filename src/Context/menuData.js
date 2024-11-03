import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

export const SubMenuData = [
    
    {
        name : 'Dashboard',
        icon : <MdDashboard/>,
        subMenus : [
            {name : 'Call History',
             icon : <FaPhoneAlt/>,
             
            path : '/Admin/Dashboard/CallHistory'}, 
        ]
    }, 
    {
        name : 'User Management',
        icon : <FaUserCircle/>,
        subMenus : [
            {name : 'Create Tutor',
             icon : <FaPhoneAlt/>,
             
            path : '/Admin/usermanagement/CreateTutor'}, 
        ]
    }
]; 
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export const SubMenuData = [
    
    {
        name : 'Dashboard',
        icon : <FaPhoneAlt/>,
        subMenus : [
            {name : 'Call History',
             icon : <FaPhoneAlt/>,
             
            path : '/Admin/Dashboard/CallHistory'}, 
            {
                name : 'users',
                icon : <FaUserCircle/>,
                path : '/Admin/Dashboard/CallHistory',
            }, 
            
        ]
    }
]; 
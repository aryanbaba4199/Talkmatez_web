import {
  FaGuilded,
  FaLanguage,
  FaPhoneAlt,
  FaUser,
  FaWeibo,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BiPackage, BiWorld } from "react-icons/bi";

export const SubMenuData = [
  {
    name: "Dashboard",
    icon: <MdDashboard />,
    subMenus: [
      {
        name: "Call History",
        icon: <FaPhoneAlt />,

        path: "/Admin/Dashboard/CallHistory",
      },
    ],
  },
  {
    name: "User Management",
    icon: <FaUserCircle />,
    subMenus: [
      {
        name: "Create Tutor",
        icon: <FaPhoneAlt />,

        path: "/Admin/usermanagement/CreateTutor",
      },
    ],
  },
  {
    name: "App Management",
    icon: <FaWeibo />,
    subMenus: [
      {
        name: "Languages",
        icon: <FaLanguage />,

        path: "/application/language",
      },
      {
        name: "Guide Images",
        icon: <FaGuilded />,

        path: "/application/guide",
      },
      {
        name: "Country",
        icon: <BiWorld />,

        path: "/application/country",
      },
      {
        name : "Packages",
        icon : <BiPackage />,
        path : "/application/packages"
      }
    ],
  },
];

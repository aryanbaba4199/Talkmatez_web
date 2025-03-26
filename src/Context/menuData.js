import {
  FaGuilded,
  FaImages,
  FaLanguage,
  FaMoneyBill,
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
      {
        name: "Transaction",
        icon: <FaMoneyBill />,

        path: "/Admin/Dashboard/transaction",
      },
    ],
  },
  {
    name: "User Management",
    icon: <FaUserCircle />,
    subMenus: [
      {
        name: "Tutors",
        icon: <FaPhoneAlt />,

        path: "/Admin/usermanagement/CreateTutor",
      },
      {
        name: "Users",
        icon: <FaUser />,
        path: "/Admin/usermanagement/users",
      }
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
      },
      {
        name : "Sliders",
        icon : <FaImages />,
        path : "/application/sliders"
      },
    ],
  },
];

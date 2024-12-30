import { Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronCircleUp } from "react-icons/fa";
import { SubMenuData } from "@/Context/menuData";

const SideBarMenu = ({ setShowMenu }) => {
  const [openMenu, setOpenMenu] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenu((prevState) => ({
      ...prevState,
      [menuName]: !prevState[menuName],
    }));
  };

  return (
    <div className="pt-20">
      <div>
        {SubMenuData.map((menu, index) => (
          <div key={index} className="mt-2">
            {/* Parent Menu */}
            <div
              onClick={() => toggleMenu(menu.name)}
              className="pl-8 flex justify-between hover:cursor-pointer items-center px-8 gap-2 hover:bg-gray-300 py-1 text-[#15892e]"
            >
              <div className="flex justify-start items-center gap-2">
              {menu.icon}
              <Typography className="font-semibold">
                {menu.name}
              </Typography>
              </div>
              <FaChevronCircleUp
                className={`transition-all ease-in-out ${
                  openMenu[menu.name] ? "" : "rotate-180"
                }`}
              />
            </div>

            {/* Child Menus */}
            {openMenu[menu.name] &&
              menu.subMenus.map((subMenu, subIndex) => (
                <div
                  key={subIndex}
                  onClick={() => setShowMenu(false)}
                  className="flex justify-start items-center pl-16 gap-2 hover:bg-gray-200 py-1 text-[#15892e]"
                >
                  {subMenu.icon}
                  <Link href={subMenu.path}>{subMenu.name}</Link>
                </div>
              ))}
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default SideBarMenu;

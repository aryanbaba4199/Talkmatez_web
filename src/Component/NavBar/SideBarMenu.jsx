import { Typography } from '@mui/material'
import Link from 'next/link';
import React from 'react'
import { IoCreateOutline } from "react-icons/io5";

const SideBarMenu = ({setShowMenu}) => {
  return (
    <div className='pt-20'>
        <div onClick={()=>setShowMenu(false)} className='flex justify-center items-center px-8 gap-2 hover:bg-gray-200 py-1 text-[#15892e]'>
            <IoCreateOutline/>
            <Link href='/Admin/CreateTutor'>Create Tutor</Link>
        </div>
    </div>
  )
}

export default SideBarMenu
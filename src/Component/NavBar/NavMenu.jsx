'use client'
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import SideBarMenu from './SideBarMenu';
import { Drawer } from '@mui/material';
import { useApp } from '../Helpers/AppContext';
import { IoIosLogOut } from "react-icons/io";

export default function ButtonAppBar() {
    const [showMenu, setShowMenu] = useState(false);
    const {user, setUser} = useApp();
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{
        backgroundColor: '#15892e',
      }}>
        <Toolbar>
          <IconButton
            onClick={()=>setShowMenu(!showMenu)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography className='hover:cursor-pointer' onClick={()=>window.location.href='/'} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Talkmatez
          </Typography>
          
         
          {user===null ? <div className='bg-red-600 px-4 rounded-md flex gap-4 items-center'>
       
            <Button onClick={()=>{
              localStorage.removeItem('token');
              setUser(null)
              window.location.reload()
            }} color="inherit">Log out</Button>
            <IoIosLogOut className='text-lg font-bold'/>
            </div>
          
         :  <div><Button color="inherit">Login</Button></div>
         
         }
        </Toolbar>
      </AppBar>
    </Box>
    <Drawer open={showMenu} onClose={()=>setShowMenu(false)}>
      <SideBarMenu setShowMenu={setShowMenu}/>
    </Drawer>
    </>
  );
}

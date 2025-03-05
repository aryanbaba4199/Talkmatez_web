'use client'
import React, { useEffect, useState } from "react";

import Tutors from "@/Component/Homepage/Tutors";
import Login from "@/Component/auth/Login";
import { useApp } from "@/Component/Helpers/AppContext";



const Page = () => {
  const {user, setUser} = useApp();
  const [rendepage, setRenderPage] = useState(0);

  useEffect(()=>{
    if(user===null && typeof window !== 'undefined' && localStorage.getItem('token')){
      setRenderPage(1)
    }
  }, [user])

  return (
    <div>
      {rendepage===0 ? <Login/> : <Tutors/>}

    </div>
  );
};

export default Page;

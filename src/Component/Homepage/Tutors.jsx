'use client'
import Api from '@/Api';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TutorCard from './TutorCard';


const Tutors = () => {
    const [tutors, setTutors] = useState([]); 

    useEffect(()=>{
        getTutorsList();
    }, [])

    const getTutorsList = async()=>{
        try{
            const res =await axios.get(Api.getTutorsAPI); 
            if(res.status===200){
                setTutors(res.data);
                console.log(res.data);
            }
        }catch(e){
            console.error(e)
        }
    }

  return (
    <div className='flex justify-center items-center m-4 gap-8 flex-wrap hover:cursor-pointer'>
        {tutors.length!==0 && tutors?.map((item, index)=>(
            <div key={index} className='hover:scale-105 ease-in-out transition-all hover:z-[2000]'>
            <TutorCard tutor = {item}/>
            </div>
        ))}
    </div>
  )
}

export default Tutors
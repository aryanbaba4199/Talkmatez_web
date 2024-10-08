"use client";
import Api from "@/Api";
import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const defaulFormData = {
  name: "",
  email: "",
  qualification: "",
  image: "",
  mobile: "",
  primaryLanguage: "",
  secondaryLanguage: "",
  otherLanguage: "",
  status: "",
  tutorType: "",
  rate: "",
  greet: "",
};

const page = () => {
  const [formData, setFormData] = useState(defaulFormData);
  const [languages, setLanguages] = useState("English");

  useEffect(() => {
    getLanguages();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post(Api.createTutor, {formData});
      if(res.status===200){
        Swal.fire({
          title : 'Success', 
          icon : 'success',
          text : 'Tutor Created Successfully'
        })
      }
    }catch(e){
      Swal.fire({
        title : 'Error',
        icon : 'error',
        text : 'Error creating Tutor'
      })
      console.error(e);
    }
  };

  const getLanguages = async () => {
    try {
      const res = await axios.get(Api.getLanguages);
      if (res.status === 200) {
        console.log(res.data);
        setLanguages(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
        
      <div className="mt-20 m-4 grid md:grid-cols-3 grid-cols-1">
 
        <div className="mt-4 w-[25rem]">
          <TextField
            fullWidth
            label="Enter Your Name"
            name="name"
            variant="outlined"
            color="success"
            autoFocus
            value={formData.name}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="mt-4 w-[25rem]">
          <TextField
            fullWidth
            label="Enter Your Email"
            name="email"
            variant="outlined"
            color="success"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="mt-4 w-[25rem]">
          <TextField
            fullWidth
            label="Enter Your Qualification"
            name="qualification"
            variant="outlined"
            color="success"
            
            value={formData.qualification}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="mt-4 w-[25rem]">
          <Autocomplete
            options={languages}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select your Primary Language"
                name="primaryLanguage"
                variant="outlined"
                color="success"
                
                required
              />
            )}
            onInputChange={(event, newValue) => {
              setFormData({ ...formData, primaryLanguage: newValue });
            }}
            value={formData.primaryLanguage}
            
          ></Autocomplete>
        </div>
        <div className="mt-4 w-[25rem]">
          <Autocomplete
            options={languages}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select your Secondary Language"
                name="secondaryLanguage"
                variant="outlined"
                color="success"
                
                required
              />
            )}
            onInputChange={(event, newValue) => {
              setFormData({ ...formData, secondaryLanguage: newValue });
            }}
            value={formData.secondaryLanguage}
          ></Autocomplete>
        </div>

        <div className="mt-4 w-[25rem]">
          <Autocomplete
            options={languages}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select your Other Language"
                name="otherLanguage"
                variant="outlined"
                color="success"
                required
              />
            )}
            onInputChange={(event, newValue) => {
              setFormData({ ...formData, otherLanguage: newValue });
            }}
            value={formData.otherLanguage}
          ></Autocomplete>
        </div>
        <div className="mt-4 md:w-[25rem] w-[100%]">
          <Autocomplete
            options={['available', 'busy', 'offline']}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select your status"
                name="status"
                variant="outlined"
                color="success"
                required
              />
            )}
            onInputChange={(event, newValue) => {
              setFormData({ ...formData, status: newValue });
            }}
            value={formData.status}
          ></Autocomplete>

        </div>
        <div className="mt-4 w-[25rem]">
          <Autocomplete
            options={['Freelancer', 'Full Time', 'Part time']}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select your Employeement type"
                name="tutorType"
                variant="outlined"
                color="success"
                required
              />
            )}
            onInputChange={(event, newValue) => {
              setFormData({ ...formData, tutorType: newValue });
            }}
            value={formData.tutorType}
          ></Autocomplete>
        </div>
        <div className="mt-4 w-[25rem]">
          <TextField
            fullWidth
            label="Select your rate in coins"
            name="rate"
            type="number"
            variant="outlined"
            color="success"
            required
            value={formData.rate}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mt-4 w-[25rem]">
          <TextField
            fullWidth
            label="Write you greeting message"
            name="greet"
            variant="outlined"
            color="success"
            required
            value={formData.greet}
            onChange={(e) => handleChange(e)}
            multiline
          />
        </div>
    
      </div>
      <div className="flex justify-center items-center">
        <Button onClick={(e)=>handleSubmit(e)} variant="contained" color="success">Submit</Button>
      </div>

      
    </>
  );
};

export default page;

"use client";
import Api, { posterFunction } from "@/Api";
import { Autocomplete, Button, Card, Dialog, IconButton, InputAdornment, TextField, Typography, Box, Input } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { uploadToCloudinary } from "@/Context/helperfunction";

const defaulFormData = {
  name: "",
  email: "",
  qualification: "",
  image: "",
  mobile: "",
  primaryLanguage: "",
  secondaryLanguage: "",
  otherLanguage: "",
  status: "offline",
  tutorType: "",
  rate: "",
  greet: "",
  loginId: "",
  password: "",
};

const Page = () => {
  const [formData, setFormData] = useState(defaulFormData);
  const [credentialOpen, setCredentialOpen] = useState(false);
  const [passwordView, setViewPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    getLanguages();
  }, []);




  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result); // Set image preview URL
      };
      reader.readAsDataURL(file); // Read file as Data URL
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const imageUri = await uploadToCloudinary(image);
        const userData = {...formData, image : imageUri}
        console.log(userData);
      const res = await posterFunction(Api.createTutor, userData );
      console.log(res);
        Swal.fire({
          title: 'Success',
          icon: "success",
          text: res.data.message,
        });
     
      
        
    } catch (e) {
      Swal.fire({
        title: "Failed",
        icon: "error",
        text: e.details,
      });
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
    <div className="flex justify-center items-center">
      <Typography fontSize={20} fontWeight={700}>Create Tutor</Typography>
    </div>
    <Box sx={{ textAlign: 'center', padding: 4 }} cla>

      {image && (
        <div mt={2} className="flex justify-center items-center">
          <img 
            src={image} 
            alt="Selected Preview" 
            className="w-48 h-48 rounded-full"
          />
        </div>
      )}
            <Typography variant="h6">Select Image</Typography>
      <Button 
        variant="contained" 
        component="label" 
        sx={{ mt: 2 }}
      >
        Choose Image
        <Input 
          type="file" 
          accept="image/*" 
          hidden 
          onChange={handleImageSelect} 
        />
      </Button>
    </Box>
    {languages?.length>0 &&
    <form onSubmit={handleSubmit}>
      <div className="mt-4 m-4 grid md:grid-cols-3 grid-cols-1">
        
        <div className="mt-4 w-[25rem]">
          <TextField
            fullWidth
            label="Enter Tutor Name"
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
            label="Enter Tutor Email"
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
            label="Qualification"
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
            options={languages.map(item=>item.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Primary Language"
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
            options={languages.map(item=>item.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Secondary Language"
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
            options={languages.map(item=>item.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Other Language"
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
        {/* <div className="mt-4 md:w-[25rem] w-[100%]">
          <Autocomplete
            options={["available", "busy", "offline"]}
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
        </div> */}
        <div className="mt-4 w-[25rem]">
          <Autocomplete
            options={["Freelancer", "Full Time", "Part time"]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Employeement type"
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
            label="Rate in coins"
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
            label="greeting message"
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
        <Button
          variant="contained"
          color="success"
          onClick={()=>setCredentialOpen(true)}
        >
          Submit
        </Button>
      </div>
      <Dialog open={credentialOpen} onClose={()=>setCredentialOpen(false)}>
        <div className="mt-4 px-16 p-2 flex justify-center items-center">
          <Typography variant="h5" fontWeight={700} color="#15892e">Create Tutor Credential</Typography>
        </div>
        <div className="px-16 p-4">
        <div>
          <Card elevation={2}>
          <div className="mt-4 w-[25rem]">
          <TextField
            fullWidth
            label="Log In ID"
            name="loginId"
            variant="outlined"
            color="success"
            required
            value={formData.loginId}
            onChange={(e) => handleChange(e)}
            
          />
        </div>
        <div className="mt-4 w-[25rem]">
          <TextField
            fullWidth
            label="Password"
            type={passwordView ? 'text' : 'password'}
            name="password"
            variant="outlined"
            color="success"
            required
            value={formData.password}
            onChange={(e) => handleChange(e)}
            
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={()=>setViewPassword(!passwordView)} edge="end">
                    {passwordView ? <FaRegEyeSlash className="text-black" /> : <FaRegEye className="text-[#15892e]"/>}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
         
        </div>
          </Card>
        </div>
        <div className="flex justify-center items-center mt-4">
        <Button variant="contained" color="success" type="submit" onClick={handleSubmit} >Create Tutor</Button>
        </div>
        </div>
      </Dialog>
      </form>
}
    </>
  );
};

export default Page;

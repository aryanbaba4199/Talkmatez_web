'use client';

import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import Api, { callerFunction, posterFunction, removerFunction } from '@/Api';
import { CiCircleRemove } from "react-icons/ci";

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dltniftfn/image/upload'; // Cloudinary URL
const UPLOAD_PRESET = 'talkmatez'; // Unsigned upload preset

const Page = () => {
  const [guides, setGuides] = useState([]);
  const [open, setOpen] = useState(false);
  const [rank, setRank] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getGuides();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); 
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      setUploading(true);
      const res = await axios.post(CLOUDINARY_URL, formData);
      setUploading(false);
      return res.data.secure_url; // Cloudinary image URL
    } catch (error) {
      setUploading(false);
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Image upload failed');
    }
  };

  const handleCreateGuide = async () => {
    if (!rank.trim() || !image) {
      alert('Please provide both rank and image');
      return;
    }

    try {
   
      const imageUrl = await uploadToCloudinary(image);

      const formData = { rank, image: imageUrl };
      await posterFunction(Api.createGuide, formData);

      setRank('');
      setImage(null);
      setOpen(false);
      getGuides();
    } catch (error) {
      console.error('Error creating guide:', error);
    }
  };

  const getGuides = async () => {
    try {
      const response = await callerFunction(Api.getGuides);
      setGuides(response.data);
    } catch (error) {
      console.error('Error fetching guides:', error);
    }
  };

  const deleteGuide = async (id) => {
    try {
      await removerFunction(`${Api.deleteGuide}/${id}`);
      getGuides();
    } catch (error) {
      console.error('Error deleting guide:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className=" mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Guide Images</h1>

        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">Manage guide images below. Click Create Guide Image to add a new one.</p>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AiOutlinePlus />}
            onClick={() => setOpen(true)}
          >
            Create Guide Image
          </Button>
        </div>

        {guides.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {guides.map((guide, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 border rounded-md shadow-sm flex flex-col items-center"
              >
                <img src={guide.image} alt={`Guide Rank ${guide.imageUri}`} className="h-32 w-32 object-cover mb-2" />
                <div className='flex justify-between items-center w-full'>
                  <p className="font-semibold text-gray-700">Rank: {guide.rank}</p>
                  <CiCircleRemove className='font-semibold text-lg text-red-600 bg-red-200 rounded-full hover:cursor-pointer' onClick={() => deleteGuide(guide._id)} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No guide images found.</p>
        )}

        {/* Create Guide Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Create Guide Image</DialogTitle>
          <DialogContent>
            <div className="space-y-4">
              <TextField
                fullWidth
                label="Rank"
                variant="outlined"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              />
              {uploading ? (
                <p className="text-blue-600 font-medium">Uploading...</p>
              ) : (
                image && <img src={URL.createObjectURL(image)} alt="Preview" className="h-32 w-32 object-cover mt-2" />
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
            <Button onClick={handleCreateGuide} color="primary">Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Page;

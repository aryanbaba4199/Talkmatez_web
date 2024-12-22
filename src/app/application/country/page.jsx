'use client';

import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
import { CiCircleRemove } from 'react-icons/ci';
import Api, { callerFunction, posterFunction, removerFunction } from '@/Api';



const CountryPage = () => {
  const [countries, setCountries] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [mobileDigits, setMobileDigits] = useState('');

  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch countries from backend
  const fetchCountries = async () => {
    try {
      const response = await callerFunction(Api.getCountries);
      console.log(response.data);
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  // Create a new country
  const handleCreateCountry = async () => {
    if (!name.trim() || !code.trim() || !mobileDigits.trim()) {
      alert('All fields are required');
      return;
    }

    try {
      const formData = { name, code, mobileDigits: Number(mobileDigits) };
      await posterFunction(Api.createCountry, formData);
      fetchCountries(); // Refresh the country list
      setOpen(false);
      setName('');
      setCode('');
      setMobileDigits('');
    } catch (error) {
      console.error('Error creating country:', error);
      alert('Failed to create country. Ensure the code and name are unique.');
    }
  };

  // Delete a country
  const handleDeleteCountry = async (id) => {
    try {
      await removerFunction(`${Api.deleteCountry}/${id}`);
      fetchCountries(); // Refresh the country list
    } catch (error) {
      console.error('Error deleting country:', error);
      alert('Failed to delete country.');
    }
  };

  console.log(countries)

  return (
    <div className="p-6 bg-gray-100 ">
      <div className=" mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Countries</h1>

        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">Manage countries below. Click "Add Country" to create a new one.</p>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AiOutlinePlus />}
            onClick={() => setOpen(true)}
          >
            Add Country
          </Button>
        </div>

        {countries?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {countries.map((country) => (
              <div
                key={country._id}
                className="p-4 bg-gray-50 border rounded-md shadow-sm flex flex-col"
              >
                <p className="font-semibold text-gray-700">Name: {country.name}</p>
                <p className="text-gray-600">Code: {country.code}</p>
                <p className="text-gray-600">Mobile Digits: {country.mobileDigits}</p>
                <CiCircleRemove
                  className="font-semibold text-lg text-red-600 bg-red-200 rounded-full hover:cursor-pointer mt-2 self-end"
                  onClick={() => handleDeleteCountry(country._id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No countries found.</p>
        )}

        {/* Create Country Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Add Country</DialogTitle>
          <DialogContent>
            <div className="space-y-4">
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Code"
                variant="outlined"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <TextField
                fullWidth
                label="Mobile Digits"
                type="number"
                variant="outlined"
                value={mobileDigits}
                onChange={(e) => setMobileDigits(e.target.value)}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
            <Button onClick={handleCreateCountry} color="primary">Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default CountryPage;

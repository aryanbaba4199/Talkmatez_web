'use client'
import Api, { callerFunction, posterFunction, removerFunction } from '@/Api';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { CiCircleRemove } from "react-icons/ci";

const Page = () => {
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    getLanguages();
  }, []);

  const getLanguages = async () => {
    try {
      const res = await callerFunction(Api.getLanguages);
      setLanguages(res.data);
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };

  const createLanguage = async () => {
    if (!newLanguage.trim()) return alert('Please enter a language name');
    
    const formData = {name : newLanguage};
    console.log('Creating language', formData);
    try {
      await posterFunction(Api.createLanguage, formData);
      setNewLanguage('');
      setIsCreating(false);
      getLanguages(); 
    } catch (error) {
      console.error('Error creating language:', error);
    }
  };

  const deleteLanguage = async(id)=>{
    try {
      await removerFunction(`${Api.deleteLanguage}/${id}`).then(
        getLanguages()
      )
    } catch (error) {
      console.error('Error deleting language:', error);
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Languages</h1>

        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            Manage the list of languages 
          </p>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
            onClick={() => setIsCreating(true)}
          >
            <AiOutlinePlus size={18} /> Create Language
          </button>
        </div>

        {languages.length > 0 ? (
          <ul className="space-y-2">
            {languages.map((language, index) => (
              <li
                key={index}
                className="px-4 py-2 bg-gray-50 border rounded-md shadow-sm text-gray-700 flex justify-between items-center"
              >
                <span>
                {language.name}
                </span>
                <CiCircleRemove className='font-semibold text-lg text-red-600 bg-red-200 rounded-full hover:cursor-pointer' onClick={()=>deleteLanguage(language._id)} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No languages found.</p>
        )}

        {isCreating && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md shadow-md border">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Add New Language
            </h2>
            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="Enter language name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="mt-4 flex gap-4">
              <button
                className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 transition"
                onClick={createLanguage}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 transition"
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

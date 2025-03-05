"use client";
import Api, { callerFunction, removerFunction, updaterFunction } from "@/Api";
import React, { useEffect, useState } from "react";
import { Card, Typography, IconButton, TextField, Button } from "@mui/material";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Loaders from "@/Component/Helpers/Loaders";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedCoins, setUpdatedCoins] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await callerFunction(Api.getUsers);
      setUsers(res.data);
      setFilteredUsers(res.data); // Initially set filtered users to all users
      setLoading(false); //
    } catch (e) {
      setLoading(false);
      console.error("Error in getting users", e);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user._id);
    setUpdatedCoins(user.coins);
  };

  const handleSaveClick = async (userId) => {
    setLoading(true);
    try {
      const formData = { userId, coins: updatedCoins };

      await updaterFunction(Api.addCoins, formData);
      // Update state after success
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, coins: updatedCoins } : user
        )
      );
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, coins: updatedCoins } : user
        )
      );
      setEditingUser(null);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error("Error updating coins:", e);
    }
  };

  const handleCancelClick = () => {
    setEditingUser(null);
    setUpdatedCoins("");
  };

  const handleSearch = (event) => {
    setLoading(true);
    const query = event.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.mobile.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
    setLoading(false);
  };

  const handleRemove = async(user)=>{
    try{
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });
      if(result.isConfirmed){
        setLoading(true);
        const res = await removerFunction(`${Api.removeUser}/${user._id}`);
        Swal.fire({
          title: "User deleted!",
          icon: "success",
          text : `${user.name} account is deleted permanently`,
          timer : 6000,
        })
        fetchUsers();
        
      }
    }catch(e){
      Swal.fire({
        title: "Error deleting user!",
        icon: "error",
        timer: 3000,
      })
      console.error("Error removing user", e);
    }
  }

  return (
    <>
    {loading ? <Loaders/> : 
    <div className="p-6 bg-gray-100 min-h-screen">
      <Typography
        variant="h4"
        className="mb-6 text-center font-bold text-gray-800"
      >
        User Management
      </Typography>

      <div className="flex justify-center mb-6">
        <TextField
          label="Search by Mobile"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full md:w-1/2"
        />
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {filteredUsers.length===0 && <div className="w-full h-screen justify-center items-center">
          <span className="text-xl text-center font-old">No Users Found </span>
          </div>}
        {filteredUsers.map((user) => (
          <Card
            key={user._id}
            className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow"
          >
            <Typography variant="h6" className="text-gray-800 font-bold">
              {user.name}
            </Typography>
            <Typography className="text-gray-600">
              Mobile: {user.mobile}
            </Typography>
            <Typography className="text-gray-600">
              Primary Language: {user.primaryLanguage}
            </Typography>
            <Typography className="text-gray-600">
              Secondary Language: {user.secondaryLanguage}
            </Typography>
            <Typography className="text-gray-600">
              Other Language: {user.otherLanguage}
            </Typography>
            <div className="flex items-center mt-4">
              {editingUser === user._id ? (
                <>
                  <TextField
                    type="number"
                    size="small"
                    label="Coins"
                    value={updatedCoins}
                    onChange={(e) => setUpdatedCoins(e.target.value)}
                    className="mr-2"
                  />
                  <IconButton
                    color="success"
                    onClick={() => handleSaveClick(user._id)}
                  >
                    <MdSave />
                  </IconButton>
                  <IconButton color="error" onClick={handleCancelClick}>
                    <MdCancel />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography className="text-blue-600 font-semibold mr-2">
                    Coins: {user.coins}
                  </Typography>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(user)}
                  >
                    <MdEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleRemove(user)}
                  >
                    <FaTrash />
                  </IconButton>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
}
    </>
  );
};

export default Page;

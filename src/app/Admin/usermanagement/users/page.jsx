"use client";
import Api, { callerFunction, updaterFunction } from "@/Api";
import React, { useEffect, useState } from "react";
import { Card, Typography, IconButton, TextField, Button } from "@mui/material";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedCoins, setUpdatedCoins] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await callerFunction(Api.getUsers);
      setUsers(res.data);
      setFilteredUsers(res.data); // Initially set filtered users to all users
    } catch (e) {
      console.error("Error in getting users", e);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user._id);
    setUpdatedCoins(user.coins);
  };

  const handleSaveClick = async (userId) => {
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
    } catch (e) {
      console.error("Error updating coins:", e);
    }
  };

  const handleCancelClick = () => {
    setEditingUser(null);
    setUpdatedCoins("");
  };

  const handleSearch = (event) => {
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
  };

  return (
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
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;

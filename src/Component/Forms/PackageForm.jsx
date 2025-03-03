import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { AiFillDollarCircle, AiOutlineUpload } from "react-icons/ai";
import { MdTitle } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import Api, { posterFunction, updaterFunction } from "@/Api";
import Swal from "sweetalert2";
import { FaCoins } from "react-icons/fa";

const CreatePackageForm = ({ editMode, setOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    narration: "",
    icon: "",
    amount: "",
    coins : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Package Data:", formData);
    try {
      if(editMode){
        await updaterFunction(Api.updatePackage, formData);
        setOpen(false);
      }else{
        await posterFunction(Api.createPackage, formData);
        setOpen(false)
      }
    
      Swal.fire({
        title: `Package ${editMode ? "Updated" : "Created"} Successfully!`,
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (e) {
      console.error("Error creating package:", e);
      Swal.fire({
        title: "Error Creating Package!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    if (editMode) {
      console.log("Package Data:", editMode);
      setFormData(editMode);
    }
  }, [editMode]);

  console.log(formData);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Package
        </h2>

        <div className="mb-4">
          <label
            className="flex items-center gap-2 text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            <MdTitle size={20} /> Title
          </label>
          <TextField
            id="title"
            name="title"
            variant="outlined"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter package title"
          />
        </div>

        <div className="mb-4">
          <label
            className="flex items-center gap-2 text-gray-700 font-medium mb-2"
            htmlFor="narration"
          >
            <BiDetail size={20} /> Narration
          </label>
          <TextField
            id="narration"
            name="narration"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={formData.narration}
            onChange={handleChange}
            placeholder="Enter narration for the package"
          />
        </div>

        <div className="mb-4">
          <label
            className="flex items-center gap-2 text-gray-700 font-medium mb-2"
            htmlFor="icon"
          >
            <AiOutlineUpload size={20} /> Icon
          </label>
          <TextField
            id="icon"
            name="icon"
            variant="outlined"
            fullWidth
            value={formData.icon}
            onChange={handleChange}
            placeholder="Enter icon URL"
          />
        </div>

        <div className="mb-4">
          <label
            className="flex items-center gap-2 text-gray-700 font-medium mb-2"
            htmlFor="amount"
          >
            <AiFillDollarCircle size={20} /> Amount
          </label>
          <TextField
            id="amount"
            name="amount"
            variant="outlined"
            type="number"
            fullWidth
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
          />
        </div>
        <div className="mb-4">
          <label
            className="flex items-center gap-2 text-gray-700 font-medium mb-2"
            htmlFor="amount"
          >
            <FaCoins size={20} /> Coins
          </label>
          <TextField
            id="coins"
            name="coins"
            variant="outlined"
            type="number"
            fullWidth
            value={formData.coins}
            onChange={handleChange}
            placeholder="Enter Coins Value"
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreatePackageForm;

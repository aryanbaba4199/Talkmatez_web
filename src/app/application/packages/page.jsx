"use client";
import React, { useEffect, useState } from "react";
import CreatePackageForm from "@/Component/Forms/PackageForm";
import Api, { callerFunction, removerFunction } from "@/Api";
import { Button, Card, Typography, IconButton } from "@mui/material";
import { MdEdit, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const Page = () => {
  const [pkgData, setPkgData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getPackage();
  }, []);

  const getPackage = async () => {
    try {
      const res = await callerFunction(Api.getPackages);
      setPkgData(res.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await removerFunction(`${Api.deletePackage}/${id}`);
      getPackage();
      Swal.fire({
        title: "Package deleted successfully!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (e) {
      Swal.fire({
        title: "Error deleting package!",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.error("Error deleting package:", e);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {showForm && !editMode ? (
        <CreatePackageForm editMode={editMode} setOpen={setShowForm} />
      ) : (
        <>
          {editMode ? (
            <CreatePackageForm editMode={editMode} setOpen={setEditMode} />
          ) : (
            <div className="grid md:grid-cols-4 mt-4 grid-cols-1 gap-6">
              {pkgData.map((item, index) => (
                <Card
                  key={index}
                  className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <Typography className="text-gray-600 mb-2">
                    Narration: {item.narration}
                  </Typography>
                  <p className="font-semibold mb-2">Price: ₹{item.amount}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Icon: {item.icon}
                  </p>
                  <div className="flex justify-between">
                    <IconButton
                      onClick={() => setEditMode(item)}
                      color="primary"
                    >
                      <MdEdit size={20} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(item._id)}
                      color="error"
                    >
                      <MdDelete size={20} />
                    </IconButton>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      <div className="flex justify-center mt-6">
        <Button
          onClick={() => {
            editMode ? setEditMode(!editMode) : setShowForm(!showForm);
          }}
          variant="contained"
          color={showForm ? "secondary" : "primary"}
          className="py-2 px-4 text-lg"
        >
          {showForm || editMode ? "Close" : "Create Package"}
        </Button>
      </div>
    </div>
  );
};

export default Page;

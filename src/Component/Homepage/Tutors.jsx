"use client";
import Api, { API_URL, removerFunction } from "@/Api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TutorCard from "./TutorCard";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import { Phone, Videocam, Message, Delete } from "@mui/icons-material";
import Swal from "sweetalert2";

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [socketLogs, setSocketLogs] = useState([]);

  useEffect(() => {
    getTutorsList();
    getScoketLogs();
  }, []);

  const getTutorsList = async () => {
    try {
      const res = await axios.get(Api.getTutorsAPI);
      if (res.status === 200) {
        setTutors(res.data);
        console.log(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getScoketLogs = async () => {
    try {
      const res = await axios.get(Api.getSocketLogs);
      setSocketLogs(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleTutorDelete = async (id) => {
    try {
      await removerFunction(`${Api.removeTutor}/${id}`);
      Swal.fire({
        title: "success",
        icon: "success",
        text: `tutor ${id} deleted successfully...`,
      });
      getTutorsList();
    } catch (e) {
      console.error(e);
      Swal.fire({
        title: "error",
        icon: "error",
        text: e.message,
      });
    }
  };

  const calculateAverageRating = (ratings) => {
    console.log("Raw Ratings:", ratings);

    if (!ratings || ratings.length === 0) return 0;

    const validRatings = ratings.filter(
      (item) => item && item.rating !== undefined
    );
    console.log("Filtered Ratings:", validRatings);

    if (validRatings.length === 0) return 0;

    const total = validRatings.reduce((acc, curr) => acc + curr.rating, 0);
    console.log("Total Ratings Sum:", total);

    return (total / validRatings.length).toFixed(1);
  };

  return (
    <Box className="mt-4 p-4 bg-gray-50 min-h-screen">
      <Typography
        variant="h4"
        className="text-gray-800 font-bold mb-6 text-center"
      >
        Dashboard
      </Typography>
      <Grid container spacing={3} className="w-full">
        {tutors.map((tutor) => (
          <Grid item xs={12} sm={6} md={3} key={tutor._id}>
            <Card className="flex flex-col rounded-lg shadow-lg p-5 transition transform hover:scale-105">
              <Box className="flex items-center mb-4">
                <Avatar
                  alt={tutor.name}
                  src={tutor.image}
                  className="w-16 h-16"
                />
                <Box className="ml-4 flex-1">
                  <Typography
                    variant="body"
                    className="text-[#15892e] font-semibold"
                  >
                    {tutor.name}
                  </Typography>
                  <div className="flex justify-between items-center">
                    <Typography variant="body2" className="text-gray-600">
                      {tutor.loginId}
                    </Typography>
                    <Tooltip title={tutor.status.toUpperCase()}>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          tutor.status.toLowerCase() === "available"
                            ? "bg-green-600"
                            : tutor.status === "Busy"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                        }`}
                      />
                    </Tooltip>
                  </div>
                </Box>
              </Box>
              <CardContent className="flex flex-col gap-2">
                <Box className="flex items-center justify-between">
                  <Typography variant="body2" className="text-gray-700">
                    Calls Handled:
                  </Typography>
                  <Typography variant="body2" className="font-semibold">
                    {tutor.callsHandled}
                  </Typography>
                </Box>
                <Box className="flex items-center justify-between">
                  <Typography variant="body2" className="text-gray-700">
                    Tutor Status :
                  </Typography>
                  <Typography variant="body2" className="font-semibold">
                    <p
                      className={`${
                        tutor.status.toLowerCase() === "available"
                          ? "text-[#15892e]"
                          : tutor.status === "busy"
                          ? "text-[#FAB12F]"
                          : "text-gray-600"
                      }`}
                    >
                      {tutor.status.toUpperCase()}
                    </p>
                  </Typography>
                </Box>
                <Box className="flex items-center justify-between">
                  <Typography variant="body2" className="text-gray-700">
                    Rating:
                  </Typography>
                  <Typography
                    variant="body2"
                    className="font-semibold"
                    color={
                      calculateAverageRating(tutor?.rating) > 3
                        ? "#15892e"
                        : "#FF5722"
                    }
                  >
                    {calculateAverageRating(tutor?.rating)}
                  </Typography>
                </Box>
              </CardContent>
              <Box className="flex justify-between items-center mt-4">
                <IconButton>
                  <Phone color="primary" />
                </IconButton>
                <IconButton>
                  <Videocam color="secondary" />
                </IconButton>
                <IconButton>
                  <Message color="action" />
                </IconButton>
                <IconButton onClick={() => handleTutorDelete(tutor._id)}>
                  <Delete color="error" />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Tutors;

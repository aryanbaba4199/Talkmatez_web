"use client";
import Api, { callerFunction } from "@/Api";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
  DialogTitle,
  IconButton,
  DialogContent,
  CircularProgress,
  Dialog,
} from "@mui/material";
import UserDetails from "@/Component/Users/UserDetails";
import { FaEye } from "react-icons/fa";

const CallHistory = () => {
  const [logs, setLogs] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const [id, setId] = useState(null);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    getCallLogs();
  }, []);

  const getCallLogs = async () => {
    setLoader(true);
    try {
      const res = await callerFunction(Api.getCallLogs);
      setLogs(res.data);
    } catch (e) {
      console.error(e);
    }
    setLoader(false);
  };

  console.log(open);

  const calculateDuration = (start, end) => {
    if (end === "0") return "Ongoing";
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationMs = endDate - startDate;
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const renderAction = (action) => {
    switch (action) {
      case 0:
        return <p className="text-pink-700 font-semibold">Missed Call</p>;
      case 1:
        return <p className="text-red-600 font-semibold">Call Declined By Tutor</p>;
      case 2:
        return <p>Call Accepted By Tutor</p>;
      case 3:
        return <p className="text-[#15892e]">Call Ended by Student</p>;
      case 4:
        return <p className="text-blue-600">Call Ended by Tutor</p>;
      case 5:
        return <p className="text-orange-600 font-semibold">Student Disconnected</p>;
      case 6:
        return <p>Tutor Disconnected</p>;
      default:
        return <p>Unknown Action</p>;
    }
  };

  return (
    <>
      {loader ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress size="3rem" color="success" />
        </div>
      ) : (
        <>
          <div className="p-4">
            <Typography
              variant="h4"
              component="h2"
              className="text-center my-4"
            >
              Call History
            </Typography>

            <TableContainer
              component={Paper}
              className="shadow-lg rounded-lg"
              style={{ maxHeight: "500px", overflow: "auto" }} // Set maxHeight and enable scrolling
            >
              <Table stickyHeader>
                <TableHead className="bg-gray-200 ">
                  <TableRow>
                    <TableCell className="font-bold text-[#15892e]">
                      SN
                    </TableCell>
                    <TableCell className="font-bold text-[#15892e]">
                      Student
                    </TableCell>
                    <TableCell className="font-bold text-[#15892e]">
                      Tutor
                    </TableCell>
                    <TableCell className="font-bold text-[#15892e]">
                      Duration
                    </TableCell>
                    <TableCell className="font-bold text-[#15892e]">
                      Call Action
                    </TableCell>
                    <TableCell className="font-bold text-[#15892e]">
                      Details
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {logs.map((log, index) => (
                    <TableRow key={log._id} className="hover:bg-gray-100">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{log.student}</TableCell>
                      <TableCell>{log.user}</TableCell>

                      <TableCell>
                        {calculateDuration(log.start, log.end)}
                      </TableCell>
                      <TableCell>
                        {renderAction(parseInt(log.action))}
                      </TableCell>
                      <TableCell>
                        <FaEye
                          className="text-lg text-green-600"
                          onClick={() => setOpen(log)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Dialog
            open={open !== null}
            onClose={() => setOpen(null)}
            maxWidth="sm"
            fullWidth
            className="mt-8"
          >
            <DialogTitle className="flex items-center justify-between border-b-2 border-gray-200 p-4">
              <Typography
                variant="h6"
                className="font-semibold text-lg text-[#15892e]"
              >
                Call Log Details
              </Typography>
              <IconButton
                onClick={() => setOpen(null)}
                className="p-2 text-gray-500 hover:text-red-500"
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent className="p-6 space-y-6 bg-gray-50">
              <Card
                elevation={2}
                className="p-4 bg-white flex justify-between items-center"
              >
                <div className="p-4 bg-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <PersonIcon className="text-[#15892e]" />
                    <Typography
                      variant="subtitle1"
                      className="font-semibold text-[#15892e]"
                    >
                      Student Information
                    </Typography>
                  </div>
                  <Typography className="text-gray-700">
                    <strong>Name:</strong> {open?.student}
                  </Typography>
                  <div className="flex items-center text-gray-700 space-x-2">
                    <MonetizationOnIcon
                      fontSize="small"
                      className="text-[#15892e]"
                    />
                    <span>
                      <strong>Start Coins:</strong> {open?.studentStartCoin}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700 space-x-2">
                    <MonetizationOnIcon
                      fontSize="small"
                      className="text-[#15892e]"
                    />
                    <span>
                      <strong>End Coins:</strong> {open?.studentEndCoin}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700 space-x-2">
                    <MonetizationOnIcon
                      fontSize="small"
                      className="text-[#15892e]"
                    />
                    <span>
                      <strong>Usage Coins:</strong>{" "}
                      {open?.studentStartCoin - open?.studentEndCoin}
                    </span>
                  </div>
                </div>

                {/* Tutor Information */}
                <div className="p-4 bg-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <PersonIcon className="text-[#15892e]" />
                    <Typography
                      variant="subtitle1"
                      className="font-semibold text-[#15892e]"
                    >
                      Tutor Information
                    </Typography>
                  </div>
                  <Typography className="text-gray-700">
                    <strong>Name:</strong> {open?.user}
                  </Typography>
                  <div className="flex items-center text-gray-700 space-x-2">
                    <MonetizationOnIcon
                      fontSize="small"
                      className="text-[#15892e]"
                    />
                    <span>
                      <strong>Start Coins:</strong> {open?.tutorStartCoin}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700 space-x-2">
                    <MonetizationOnIcon
                      fontSize="small"
                      className="text-[#15892e]"
                    />
                    <span>
                      <strong>End Coins:</strong> {open?.tutorEndCoin}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700 space-x-2">
                    <MonetizationOnIcon
                      fontSize="small"
                      className="text-[#15892e]"
                    />
                    <span>
                      <strong>Earn Coins :</strong>{" "}
                      {open?.tutorEndCoin - open?.tutorStartCoin}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Session Timing */}
              {/* Session Timing */}
              <Card elevation={2} className="p-4 bg-white">
                <div className="flex items-center space-x-2 mb-4">
                  <ScheduleIcon className="text-[#15892e]" />
                  <Typography
                    variant="subtitle1"
                    className="font-semibold text-[#15892e]"
                  >
                    Session Timing
                  </Typography>
                </div>
                <Typography className="text-gray-700 flex justify-between px-8">
                  <strong>Start Time:</strong> {formatDate(open?.start)}
                </Typography>
                <Typography className="text-gray-700 flex justify-between px-8">
                  <strong>End Time:</strong>{" "}
                  {open?.end !== "0" ? formatDate(open?.end) : "Ongoing"}
                </Typography>

                <Typography className="text-gray-700 flex justify-between px-8">
                  <strong>Duration:</strong>{" "}
                  {calculateDuration(open?.start, open?.end)}
                </Typography>
                
                {open?.connection===true && open?.action!==1 ? 
                <Typography className="text-gray-700 flex justify-between px-8">
                  <strong>Call Action :</strong>{" "}
                  Missed Call
                </Typography>
                : 
                <Typography className="text-gray-700 flex justify-between px-8">
                  <strong>Call Action :</strong>{" "}
                  {renderAction(parseInt(open?.action))}
                </Typography>
                }

     
              </Card>
            </DialogContent>
          </Dialog>
          <Dialog open={id !== null}>
            <UserDetails id={id} />
          </Dialog>
        </>
      )}
    </>
  );
};

export default CallHistory;

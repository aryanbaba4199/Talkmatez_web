"use client";
import Api, { callerFunction } from "@/Api";
import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Dialog,
} from "@mui/material";
import UserDetails from "@/Component/Users/UserDetails";

const CallHistory = () => {
  const [logs, setLogs] = useState([]);
  const [showUser, setShowUser] = useState(false);
  const [id, setId] = useState(null);
  const [loader, setLoader] = useState(false);

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

  const calculateDuration = (start, end) => {
    if (end === "0") return "Ongoing";
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationMs = endDate - startDate;

    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <>
      {loader ? (
        <div>
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
                    <TableCell className="font-bold">SN</TableCell>
                    <TableCell className="font-bold">Student</TableCell>
                    <TableCell className="font-bold">Tutor</TableCell>
                    <TableCell className="font-bold">Start Time</TableCell>
                    <TableCell className="font-bold">End Time</TableCell>
                    <TableCell className="font-bold">Duration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {logs.map((log, index) => (
                    <TableRow key={log._id} className="hover:bg-gray-100">
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{log.student}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>
                        {new Date(log.start).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {log.end !== "0"
                          ? new Date(log.end).toLocaleString()
                          : "Ongoing"}
                      </TableCell>
                      <TableCell>
                        {calculateDuration(log.start, log.end)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Dialog open={id !== null}>
            <UserDetails id={id} />
          </Dialog>
        </>
      )}
    </>
  );
};

export default CallHistory;

"use client";
import Api, { callerFunction } from "@/Api";
import UserDetails from "@/Component/Users/UserDetails";
import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaEye, FaSearch } from "react-icons/fa";
import { MdStars } from "react-icons/md";

const CallHistory = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [id, setId] = useState(null);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(null);
  const [searchMobile, setSearchMobile] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    getCallLogs();
  }, []);

  const getCallLogs = async () => {
    setLoader(true);
    try {
      const res = await callerFunction(Api.getCallLogs);
      setLogs(res.data);
      setFilteredLogs(res.data);
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

  const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date"; 
    const date = new Date(Number(dateString)); // Ensure it's always a number
    return isNaN(date.getTime()) ? new Date(dateString).toLocaleString() : date.toLocaleString();
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
        return <p className="text-gray-950">Call Ended by Student</p>;
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

  const formatLocalDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleSearch = (e) => {
    const mobile = e.target.value;
    setSearchMobile(mobile);
    filterLogs(mobile, filterStatus);
  };

  const handleStatusFilter = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
    filterLogs(searchMobile, status);
  };

  const filterLogs = (mobile, status) => {
    let filtered = logs;
    if (mobile) {
      filtered = filtered.filter(log => 
        log.tmobile.includes(mobile) || log.studentMobile.includes(mobile)
      );
    }
    if (status !== "all") {
      filtered = filtered.filter(log => parseInt(log.action) === parseInt(status));
    }
    setFilteredLogs(filtered);
  };

  return (
    <>
      {loader ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="p-4">
            <h2 className="text-center my-4 text-2xl font-bold">Call History</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by mobile number"
                  value={searchMobile}
                  onChange={handleSearch}
                  className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-500" />
              </div>
              <select
                value={filterStatus}
                onChange={handleStatusFilter}
                className="p-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Statuses</option>
                <option value="0">Missed Call</option>
                <option value="1">Call Declined By Tutor</option>
                <option value="2">Call Accepted By Tutor</option>
                <option value="3">Call Ended by Student</option>
                <option value="4">Call Ended by Tutor</option>
                <option value="5">Student Disconnected</option>
                <option value="6">Tutor Disconnected</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-lg rounded-lg">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3 text-left">SN</th>
                    <th className="p-3 text-left">Tutor</th>
                    <th className="p-3 text-left">Student</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Duration</th>
                    <th className="p-3 text-left">Call Timing</th>
                    <th className="p-3 text-left">Gold</th>
                    <th className="p-3 text-left">Silver</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log, index) => (
                    <tr key={log._id} className="hover:bg-gray-200 bg-gray-100 ">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">
                        <div>
                          <p>{log.user}</p>
                          <p>{log?.tmobile}</p>
                          <p>{log?.tutorCustomId}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <p>{log.student}</p>
                          <p>{log?.umobile}</p>
                          <p>{log.userCustomId}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        {renderAction(parseInt(log.action))}
                      </td>
                      <td className="p-3">
                        {calculateDuration(log.start, log.end)}
                      </td>
                      <td className="p-3">
                        <div>
                          <p>Init Time : {formatDate(log?.initiated)}</p>
                          <p>Start Time : {formatLocalDateTime(log.start)}</p>
                          <p>End Time : {formatLocalDateTime(log.end)}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <MdStars className="text-orange-500 text-xl" /> 
                          {log.tutorEndGoldCoin - log.tutorStartGoldCoin === 0 ? "" : log.tutorEndGoldCoin - log.tutorStartGoldCoin}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <MdStars className="text-gray-500 text-xl" /> 
                          {log.tutorEndSilverCoin - log.tutorStartSilverCoin === 0 ? "" : log.tutorEndSilverCoin - log.tutorStartSilverCoin}
                        </div>
                      </td>
                      <td className="p-3">
                        <FaEye
                          className="text-lg text-green-600 cursor-pointer"
                          onClick={() => setOpen(log)}
                        />
                      </td>
                    </tr>
                 
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Dialog open={open} onClose={()=>setOpen(null)} className="mt-16 px-8">        
      
            <div className="  p-4">
              <div className="bg-white rounded-lg   p-6">
                <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4">
                  <h3 className="font-semibold text-lg text-gray-950">Call Log Details</h3>
                  <button
                    onClick={() => setOpen(null)}
                    className="p-2 text-gray-500 hover:text-red-500"
                  >
                    &times;
                  </button>
                </div>

                <div className="mt-6 space-y-6">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-gray-950">👤</span>
                      <h4 className="font-semibold text-gray-950">Student Information</h4>
                    </div>
                    <p className="text-gray-700"><strong>Name:</strong> {open?.student}</p>
                    <p className="text-gray-700"><strong>Start Gold Coins:</strong> {open?.studentStartGoldCoin}</p>
                    <p className="text-gray-700"><strong>Start Silver Coins:</strong> {open?.studentStartSilverCoin}</p>
                    <p className="text-gray-700"><strong>End Gold Coins:</strong> {open?.studentEndGoldCoin}</p>
                    <p className="text-gray-700"><strong>End Silver Coins:</strong> {open?.studentEndSilverCoin}</p>
                    <p className="text-gray-700"><strong>Usage Coins:</strong> {open?.charge}</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-gray-950">👤</span>
                      <h4 className="font-semibold text-gray-950">Tutor Information</h4>
                    </div>
                    <p className="text-gray-700"><strong>Name:</strong> {open?.user}</p>
                    <p className="text-gray-700"><strong>Mobile :</strong> {open?.mobile}</p>
                    <p className="text-gray-700"><strong>Start Gold Coins:</strong> {open?.tutorStartGoldCoin}</p>
                    <p className="text-gray-700"><strong>Start Silver Coins:</strong> {open?.tutorStartSilverCoin}</p>
                    <p className="text-gray-700"><strong>End Gold Coins:</strong> {open?.tutorEndGoldCoin}</p>
                    <p className="text-gray-700"><strong>End Silver Coins:</strong> {open?.tutorEndSilverCoin}</p>
                    <p className="text-gray-700"><strong>Earn Coins:</strong> {open?.charge}</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-gray-950">⏰</span>
                      <h4 className="font-semibold text-gray-950">Session Timing</h4>
                    </div>
                    <p className="text-gray-700"><strong>Initiated Time:</strong> {formatDate(Number(open?.initiated))}</p>

                    <p className="text-gray-700"><strong>Start Time:</strong> {formatDate(open?.start)}</p>
                    <p className="text-gray-700"><strong>End Time:</strong> {open?.end !== "0" ? formatDate(open?.end) : "Ongoing"}</p>
                    <p className="text-gray-700"><strong>Duration:</strong> {calculateDuration(open?.start, open?.end)}</p>
                   
                      <p className="text-gray-700 flex gap-2"><strong>Call Action:</strong> {renderAction(parseInt(open?.action))}</p>
                    
                  </div>
                </div>
              </div>
            </div>
          
          </Dialog>

          {id && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
              <div className="bg-white rounded-lg w-full max-w-2xl p-6">
                <UserDetails id={id} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CallHistory;
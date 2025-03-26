"use client";
import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Api, { callerFunction } from "@/Api";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loaders from "@/Component/Helpers/Loaders";
import Swal from "sweetalert2";

const TransactionRoute = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const transactionsPerPage = 50;

  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  const fetchTransactions = async (pageNumber) => {
    setLoader(true);
    try {
      const res = await callerFunction(`${Api.transaction}/${pageNumber}`);
      setTransactions(res.data.transactions);
      setFilteredTransactions(res.data.transactions);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    setLoader(false);
  };

  // Filter transactions when selectedStatus or searchTerm changes
  useEffect(() => {
    let updatedTransactions = transactions;

    if (selectedStatus !== "all") {
      updatedTransactions = updatedTransactions.filter(txn => txn.status === selectedStatus);
    }

    if (searchTerm) {
      updatedTransactions = updatedTransactions.filter(txn =>
        txn.txnId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTransactions(updatedTransactions);
  }, [selectedStatus, searchTerm, transactions]);


  const handleDeepSearch  = async()=>{
    try{
        const res = await callerFunction(`${Api.txnById}/${searchTerm}`)
        setTransactions([...transactions, res.data]);
    }catch(e){
        Swal.fire({
            title: 'Deep Search',
            text: e,
            icon: 'info',
          
  
        })
        console.error('Error in deep search', e);
    }
  }

  return (
    <>
    {loading ? <Loaders/> : 
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Transaction History</h2>

        {/* Filters: Status + Search */}
        <div className="mb-4 flex flex-wrap justify-between items-center gap-4">
          {/* Status Filter Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium">Filter by Status:</label>
            <select
              className="p-2 border rounded-lg w-40"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="flex gap-2 items-center">
          <div className="relative">
            <input
              type="text"
              className="p-2 pl-10 border rounded-lg w-64"
              placeholder="Search by Txn ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <AiOutlineSearch className="absolute left-3 top-3 text-gray-500" size={20} />
          </div>
          <button onClick={()=>handleDeepSearch()} className="bg-gray-900 text-white px-4 rounded-sm hover:bg-gray-800 py-1">Deep Search</button>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500 text-center">No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left">SN</th>
                  <th className="p-3 text-left">Txn ID</th>
                  <th className="p-3 text-left">User ID</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Coins</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((txn, index) => (
                  <tr key={txn._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="p-3 text-gray-800">{(page - 1) * transactionsPerPage + index + 1}</td>
                    <td className="p-3 text-gray-800">{txn.txnId}</td>
                    <td className="p-3 text-gray-800">{txn.userId}</td>
                    <td className="p-3 text-gray-800 font-semibold">₹{txn.amount}</td>
                    <td className="p-3 text-gray-800">{txn.coins}</td>
                    <td className="p-3">
                      {txn.status === "success" ? (
                        <span className="text-green-500 flex items-center gap-1">
                          <FaCheckCircle /> Success
                        </span>
                      ) : (
                        <span className="text-red-500 flex items-center gap-1">
                          <FaTimesCircle /> Failed
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-gray-600">
                      {new Date(txn.time).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Section */}
        <div className="flex justify-center mt-6">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              variant="outlined"
              shape="rounded"
              size="large"
              showFirstButton
              showLastButton
            />
          </Stack>
        </div>
      </div>
    </div>
}
</>
  );
};

export default TransactionRoute;

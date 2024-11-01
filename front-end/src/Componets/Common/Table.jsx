import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Table() {

    const DataTable = ({ initialData }) => {
      const [submittedData, setSubmittedData] = useState(initialData || []);
      const navigate = useNavigate();

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:5001/listItem");
            if (response.ok) {
              const data = await response.json();
              setSubmittedData(data); // Set fetched data to state
            } else {
              console.error("Failed to fetch data");
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        fetchData();
      }, []);

      const handleDelete = (id) => {
        const filteredData = submittedData.filter((data) => data.id !== id);
        setSubmittedData(filteredData);
      };
    };
  return (
    <>
      <div className="max-w-full lg:max-w-4xl mx-auto bg-white p-4 lg:p-8 rounded-lg shadow-lg w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg lg:text-2xl font-bold">Resource</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700"
          >
            <FontAwesomeIcon icon={faPlus} /> {/* Plus icon */}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white mt-6 rounded-lg border-collapse overflow-hidden text-sm lg:text-base">
            <thead>
              <tr>
                <th className="py-2 px-2 lg:px-4 text-left">ID</th>
                <th className="py-2 px-2 lg:px-4 text-left">Name</th>
                <th className="py-2 px-2 lg:px-4 text-left">Amount</th>
                <th className="py-2 px-2 lg:px-4 text-left">Usage Amount</th>
                <th className="py-2 px-2 lg:px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-[#E5ECF6]" : "bg-[#E3F5FF]"}
                >
                  <td className="border px-2 lg:px-4 py-2 lg:py-3 rounded-l-md">
                    {data.id}
                  </td>
                  <td className="border px-2 lg:px-4 py-2 lg:py-3">
                    {data.name}
                  </td>
                  <td className="border px-2 lg:px-4 py-2 lg:py-3">
                    {data.amount}
                  </td>
                  <td className="border px-2 lg:px-4 py-2 lg:py-3">
                    {data.usageAmount}
                  </td>
                  <td className="border px-2 lg:px-4 py-2 lg:py-3 flex justify-around rounded-r-md">
                    {/* Edit and Delete icons */}
                    <button className="text-blue-500 hover:text-blue-700">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(data.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

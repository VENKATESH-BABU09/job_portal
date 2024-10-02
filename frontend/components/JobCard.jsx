import React, { useState } from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaRupeeSign } from 'react-icons/fa';

import {api} from "../api/api";

const JobCard = ({ job }) => {
  const [applied, setApplied] = useState(false);

  const applyForJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token'); // Ensure the token is retrieved
      if (!token) throw new Error('Authorization token not found');
  
      const response = await api.patch(
        `http://localhost:4000/jobs/apply/${jobId}`,
        {}, // No request body for this PATCH request
        { headers: { Authorization: `Bearer ${token}` } } // Pass the user's token for authorization
      );
      return response.data;
    } catch (error) {
      console.error('Failed to apply:', error.response?.data || error.message);
    }
  };

  const handleApply = async () => {
    try {
      await applyForJob(job._id).then(output => {
        console.log(output);
        setApplied(true);
      }).catch(err => {
        console.log(err);
      }); // Assuming applyForJob is a function passed as a prop
       // Update the state to reflect that the user has applied
    } catch (error) {
      console.error('Failed to apply:', error);
    }
  };

  return (
    <div className="bg-yellow-100 border border-gray-200 shadow-md rounded-lg p-6 mb-4 w-full max-w-[1200px] ml-auto relative mr-28">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold">{job.companyName}</h3>
          <p className="text-sm text-gray-600">{job.employer} | 32K Reviews</p>
        </div>
        <div className="bg-indigo-500 text-white p-2 rounded-full">
          <span className="text-sm font-semibold">3.6 ★</span>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-2 text-gray-800">{job.title}</h2>

      <div className="flex items-center text-sm text-gray-600 mb-2">
        <FaBriefcase className="mr-1" />
        <p className="mr-4">{job.experience ? `${job.experience} Yrs` : 'Experience not disclosed'}</p>
        <FaRupeeSign className="mr-1" />
        <p>{job.salary ? `${job.salary} per annum` : 'Salary not disclosed'}</p>
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-2">
        <FaMapMarkerAlt className="mr-1" />
        <p>{job.location}</p>
      </div>

      <p className="text-gray-700 mt-4">{job.description}</p>

      <div className="mt-4">
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs mr-2">
          {job.skills ? job.skills.join(', ') : 'Skills not listed'}
        </span>
      </div>

      <div className="flex justify-end mt-6">
        {applied ? (
          <button 
            className="bg-green-500 text-white px-4 py-2 rounded-md !important">
            Applied
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md !important"
            onClick={handleApply}
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;

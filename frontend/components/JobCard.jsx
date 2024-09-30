import React from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaRupeeSign } from 'react-icons/fa';

const JobCard = ({ job }) => {
  return (
    <div className="bg-yellow-50 border border-gray-200 shadow-md rounded-lg p-6 mb-4 w-full max-w-xl mx-auto relative">
      {/* Company logo and reviews */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold">{job.companyName}</h3>
          <p className="text-sm text-gray-600">{job.employer} | 32K Reviews</p>
        </div>
        <div className="bg-indigo-500 text-white p-2 rounded-full">
          <span className="text-sm font-semibold">3.6 ★</span>
        </div>
      </div>

      {/* Job Title */}
      <h2 className="text-xl font-bold mb-2 text-gray-800">{job.title}</h2>

      {/* Experience and Salary */}
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <FaBriefcase className="mr-1" />
        <p className="mr-4">{job.experience ? `${job.experience} Yrs` : 'Experience not disclosed'}</p>
        <FaRupeeSign className="mr-1" />
        <p>{job.salary ? `${job.salary} per annum` : 'Salary not disclosed'}</p>
      </div>

      {/* Location */}
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <FaMapMarkerAlt className="mr-1" />
        <p>{job.location}</p>
      </div>

      {/* Job Description */}
      <p className="text-gray-700 mt-4">{job.description}</p>

      {/* Tags */}
      <div className="mt-4">
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs mr-2">
          {job.skills ? job.skills.join(', ') : 'Skills not listed'}
        </span>
      </div>

      {/* Apply Button */}
      <div className="flex justify-end mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;

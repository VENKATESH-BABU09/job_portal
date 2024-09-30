import React, { useState } from 'react';
// import axios from 'axios';

import {api} from "../api/api.js";

const PostJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [type, setType] = useState('Full-time'); // Default to Full-time
  const [companyName, setCompanyName] = useState(''); // New state for company name
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (salary < 0) {
      setError('Salary must be a positive number!');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await api.post('/jobs', 
        { title, description, location, salary, type, companyName }, // Include companyName
        {
          headers: { Authorization: `Bearer ${token}` } // Include token in the request
        }
      );

      if (response.status === 201) {
        alert('Job posted successfully!');
        // Reset form after successful submission
        setTitle('');
        setDescription('');
        setLocation('');
        setSalary('');
        setType('Full-time'); // Reset to default
        setCompanyName(''); // Reset company name
      }
    } catch (error) {
      setError(error.response?.data.message || 'Failed to post job!');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Post a Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-2">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)} // Handle company name
              placeholder="Company Name"
              required
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-2">Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
              required
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-2">Job Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
              required
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              required
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-2">Salary</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Salary"
              required
              min="0"
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-700 font-bold mb-2">Job Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;

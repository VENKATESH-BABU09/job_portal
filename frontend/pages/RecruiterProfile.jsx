import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { api } from '../api/api';

// Function to fetch employer data
const fetchEmployerData = async (username) => {
  try {
    const response = await axios.get('http://localhost:4000/employer/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching employer data:', error);
    return null;
  }
};

export default function RecruiterProfile({ loggedInUsername }) {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    companyName: '',
    companyDetails: '',
    profilePicture: null,
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchData = async () => {
      const employerData = await fetchEmployerData(loggedInUsername);
      if (employerData) {
        setProfileData({
          username: employerData.username || loggedInUsername,
          email: employerData.email || '',
          companyName: employerData.companyName || '',
          companyDetails: employerData.companyDetails || '',
        });
      }
    };
    fetchData();
  }, [loggedInUsername]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProfileData({
      ...profileData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('companyName', profileData.companyName);
      formData.append('companyDetails', profileData.companyDetails);
      formData.append('email', profileData.email);

      // if (profileData.profilePicture) {
      //   formData.append('profilePicture', profileData.profilePicture);
      // }

      console.log(formData);

      const response = await axios.patch('http://localhost:4000/employer/profile/update', formData, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating employer profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  // Function to handle Post Job button click
  const handlePostJob = () => {
    navigate('/PostJob'); // Navigate to PostJob page
  };

  // Function to handle Posted Jobs button click
  const handlePostedJobs = () => {
    navigate('/PostedJobs'); // Navigate to PostedJobs page
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto">
        {/* Profile Header */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-6 flex items-center justify-between">
          <div className="flex items-center">
            {/* Profile Picture */}
            <div className="relative bg-blue-200 rounded-full h-24 w-24">
              {profileData.profilePicture ? (
                <img
                  src={URL.createObjectURL(profileData.profilePicture)}
                  alt="Profile"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-600 absolute inset-0 flex items-center justify-center">
                  No Photo
                </span>
              )}
              <div className="absolute bottom-0 right-0">
                <label
                  htmlFor="profilePicture"
                  className="bg-blue-500 text-white px-2 py-1 text-xs rounded-full cursor-pointer"
                >
                  {profileData.profilePicture ? 'Change' : 'Add'} Picture
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-semibold">{profileData.username}</h2>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Edit Employer Profile</h3>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Company Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="companyName">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={profileData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your company name"
              required
            />
          </div>

          {/* Company Details Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="companyDetails">
              Company Details
            </label>
            <textarea
              id="companyDetails"
              name="companyDetails"
              value={profileData.companyDetails}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your company details"
              rows="4"
              required
            />
          </div>

          {/* Profile Picture Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="profilePicture">
              Company Logo
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {profileData.profilePicture && <p>Uploaded Logo: {profileData.profilePicture.name}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Update Profile
          </button>
        </form>

        {/* Job Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePostJob}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Post Job
          </button>
          <button
            onClick={handlePostedJobs}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Posted Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

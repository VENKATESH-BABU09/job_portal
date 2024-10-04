import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Function to fetch user data based on token
const fetchUserData = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/user/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token for authorization
      },
    });
    return response.data; // Assuming the response contains user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null; // Return null or handle the error appropriately
  }
};

export default function ProfilePage({ loggedInUsername }) {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    highestEducation: "",
    degreeType: "",
    stream: "",
    currentStatus: "",
    location: "",
    skills: "",
    experience: 0, // Default experience as a number
    resume: null,
    profilePicture: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData(); // Fetch data from server
      if (userData) {
        setProfileData((prevData) => ({
          ...prevData,
          name: userData.username || loggedInUsername, // Set name from user data
          email: userData.email || "",
          highestEducation: userData.highestEducation || "",
          degreeType: userData.degreeType || "",
          stream: userData.stream || "",
          currentStatus: userData.currentStatus || "",
          location: userData.location || "",
          skills: userData.skills || "",
          experience: userData.experience || 0, // Ensure experience is set as number
          resume: userData.resume || null,
          profilePicture: userData.profilePicture || null,
        }));
      }
    };

    fetchData(); // Call fetch function
  }, [loggedInUsername]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Special handling for experience field to ensure it's a number
    setProfileData({
      ...profileData,
      [name]: name === 'experience' ? Number(value) : value,
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
    console.log("Updated Profile Data:", profileData);

    try {
      const formData = new FormData();
      for (const key in profileData) {
        formData.append(key, profileData[key]);
      }

      const response = await axios.patch('http://localhost:4000/profile/update', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token for authorization
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      if (response.status === 200) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert('Failed to update profile. Please try again.'); // Optional user feedback on error
    }
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
                  src={profileData.profilePicture} // Assuming a URL for profile picture
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
              <h2 className="text-2xl font-semibold">{profileData.name}</h2>
              <p className="text-gray-600">{profileData.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Edit Your Profile</h3>

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

          {/* Highest Education */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="highestEducation">
              Highest Education
            </label>
            <select
              id="highestEducation"
              name="highestEducation"
              value={profileData.highestEducation}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select your highest education</option>
              <option value="High School">High School</option>
              <option value="Diploma">Diploma</option>
              <option value="Degree">Degree</option>
              <option value="Post-Graduate">Post-Graduate</option>
            </select>
          </div>

          {/* Degree Type */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="degreeType">
              Degree Type
            </label>
            <select
              id="degreeType"
              name="degreeType"
              value={profileData.degreeType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select your degree type</option>
              <option value="B.E">B.E</option>
              <option value="B.Tech">B.Tech</option>
              <option value="B.Sc">B.Sc</option>
              <option value="B.Com">B.Com</option>
            </select>
          </div>

          {/* Stream */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="stream">
              Stream
            </label>
            <select
              id="stream"
              name="stream"
              value={profileData.stream}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select your stream</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
            </select>
          </div>

          {/* Current Status */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="currentStatus">
              Current Status
            </label>
            <select
              id="currentStatus"
              name="currentStatus"
              value={profileData.currentStatus}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select your current status</option>
              <option value="Student">Student</option>
              <option value="Graduate">Graduate</option>
              <option value="Working Professional">Working Professional</option>
            </select>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={profileData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your location"
            />
          </div>

          {/* Skills */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="skills">
              Skills
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={profileData.skills}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your skills, separated by commas"
            />
          </div>

          {/* Experience */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="experience">
              Experience (Years)
            </label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={profileData.experience}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your experience in years"
              min="0"
            />
          </div>

          {/* Resume Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="resume">
              Resume
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              className="w-full px-3 py-2 border rounded-lg"
              onChange={handleFileChange}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

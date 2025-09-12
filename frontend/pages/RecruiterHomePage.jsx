import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RecruiterHomePage = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  // Mock function to fetch jobs created by the recruiter
  useEffect(() => {
    const fetchJobs = async () => {
      // Replace this with an API call to fetch recruiter's created jobs
      const createdJobs = [
        { id: 1, title: 'Software Engineer', location: 'New York', type: 'Full-time' },
        { id: 2, title: 'Data Scientist', location: 'San Francisco', type: 'Contract' },
      ];
      setJobs(createdJobs);
    };

    fetchJobs();
  }, []);

  // Function to handle redirection to applicants page
  const handleJobClick = (jobId) => {
    navigate(`/applicants/${jobId}`); // Redirect to applicants page for the clicked job
  };

  return (
    <div>
      <section className="bg-white py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Your <span className="text-blue-500">Created Jobs</span>
          </h1>
          <p className="text-gray-500 mb-6">
            Manage the jobs you've posted and review applicants.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-xl transition"
              onClick={() => handleJobClick(job.id)}
            >
              <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
              <p className="text-gray-600">{job.location}</p>
              <p className="text-gray-500">{job.type}</p>
            </div>
          ))}
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default RecruiterHomePage;
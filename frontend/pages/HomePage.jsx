import React from 'react';
import Filters from '../components/Filters';
import JobListings from '../components/JobListings';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <section className="bg-white py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Find your <span className="text-blue-500">new job</span> today
          </h1>
          <p className="text-gray-500 mb-6">
            Thousands of jobs in the computer, engineering, and technology sectors are waiting for you.
          </p>
          <div className="flex justify-center space-x-4">
            <input
              type="text"
              placeholder="What position are you looking for?"
              className="border border-gray-300 rounded-md px-4 py-2 w-1/2"
            />
            <input
              type="text"
              placeholder="Location"
              className="border border-gray-300 rounded-md px-4 py-2 w-1/4"
            />
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">Search</button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Filters />
          <JobListings />
        </div>
      </section>
    </div>
  );
};

export default HomePage;

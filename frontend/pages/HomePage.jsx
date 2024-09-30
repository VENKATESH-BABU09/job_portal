import React, { useState } from 'react';
import FilterForm from '../components/FilterForm';
import JobListings from './JobListings';
import Footer from '../components/Footer';

const HomePage = () => {
  const [filters, setFilters] = useState({ position: '', location: '', type: '' });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

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
          <FilterForm onFilterChange={handleFilterChange} />
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            {/* You can add additional filter options here if needed */}
          </div>
          <div className="md:col-span-3">
            <JobListings filters={filters} />
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
import React, { useState } from 'react';

const FilterForm = ({ onFilterChange }) => {
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ position, location, type });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="What position are you looking for?"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="w-full md:w-1/4 px-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
        Search
      </button>
    </form>
  );
};

export default FilterForm;
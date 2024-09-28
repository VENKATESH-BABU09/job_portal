import React from 'react';

const Filters = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Location</h3>
          <ul className="space-y-2">
            <li><label><input type="radio" name="location" className="mr-2" /> All</label></li>
            <li><label><input type="radio" name="location" className="mr-2" /> London</label></li>
            <li><label><input type="radio" name="location" className="mr-2" /> Seattle</label></li>
            <li><label><input type="radio" name="location" className="mr-2" /> Madrid</label></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Filters;

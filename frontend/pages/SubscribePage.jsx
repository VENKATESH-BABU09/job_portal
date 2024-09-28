import React from 'react';

const SubscribePage = () => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Email me for jobs</h2>
          <p className="text-gray-500 mb-6">Ut esse eiusmod aute. Sit enim labore dolore.</p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="name@email.com"
              className="border border-gray-300 rounded-md px-4 py-2 mr-4 w-1/2"
            />
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribePage;

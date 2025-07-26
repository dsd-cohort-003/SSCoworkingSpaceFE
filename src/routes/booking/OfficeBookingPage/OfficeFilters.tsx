import React from 'react';

const OfficeFilters = () => {
  return (
    <div className="bg-white rounded p-4 shadow w-60">
      <h2 className="font-bold mb-4">Filters</h2>
      <div className="mb-2">
        <input type="checkbox" id="availableNow" />
        <label className="ml-2">Available Now</label>
      </div>
      <div className="mb-2">
        <input type="checkbox" id="futureDate" />
        <label className="ml-2">Future Date</label>
      </div>
      <div className="mb-2">
        <input type="checkbox" id="contactUs" />
        <label className="ml-2">Contact Us</label>
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Space 0-20000</label>
        <input type="range" min="0" max="20000" />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Total Cost 0-150000</label>
        <input type="range" min="0" max="150000" />
      </div>
      <div className="mb-2">
        <input type="radio" name="price"></input>
        <label className="ml-2">Price Ascending</label>
      </div>
      <div className="mb-2">
        <input type="radio" name="price"></input>
        <label className="ml-2">Price Descending</label>
      </div>
    </div>
  );
};

export default OfficeFilters;

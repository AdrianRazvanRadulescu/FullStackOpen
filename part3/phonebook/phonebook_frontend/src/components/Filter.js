import React from "react";

const Filter = ({ filterName, handleFilterName }) => (
  <div>
    filter shown with: <input value={filterName} onChange={handleFilterName} />
  </div>
);

export default Filter;

import React from 'react';

import './Search.css';

const Search = ({ value, onChange, onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="Search-input"
      />
      <button
        type="submit"
        className="Search-button">
        {children}
      </button>
    </form>
  );
};

export default Search;

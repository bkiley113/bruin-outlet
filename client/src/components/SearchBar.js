import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import search_icon from "../images/search_icon.png"

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/results?query=${encodeURIComponent(searchTerm)}`);
    setSearchTerm('');
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          <input
            type='text'
            placeholder='Enter product name here . . .'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            className='searchbar'
          />
        </div>
        <img 
          src={search_icon}
          alt='Search'
          className='search_icon'
        />
        <button className="go_button">
          GO
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
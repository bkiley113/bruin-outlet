import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import search_icon from "../images/search_icon.png"

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categories = {
    men: ['men', 'male', 'gentlemen'],
    women: ['women', 'female', 'ladies'],
    kids: ['kids', 'children', 'child'],
    accessory: ['accessory', 'accessories'],
    technology: ['technology', 'tech', 'gadget'],
    stationery: ['stationery', 'office', 'school']
  };

  const mapInputToCategory = (input) => {
    let matchedCategories = [];

    // Convert user input to lower case for case-insensitive matching
    const lowerInput = input.toLowerCase();

    // Check if user input includes any category keywords
    for (const [key, values] of Object.entries(categories)) {
      if (values.some(value => lowerInput.includes(value))) {
        matchedCategories.push(key);
      }
    }

    // Return the matched categories as a single string separated by spaces
    return matchedCategories.join(' ');
  };

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    const queryCategory = mapInputToCategory(searchTerm);
    // Navigate to /results, set the query to matched categories
    navigate(`/results?query=${encodeURIComponent(queryCategory)}`);

    setSearchTerm('');
  };

  return (
    <div>
            <form onSubmit={handleSearch}>
            <div>
                <input
                    type='text'
                    placeholder='Search for products . . .'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    className='searchbar'
                />
            </div>
            <img 
                src={search_icon}
                alt=''
                className='search_icon'
            />
            <button class="go_button">
                GO
            </button>
            </form>
        </div>
    );
};

export default SearchBar;
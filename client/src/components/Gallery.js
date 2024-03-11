import React from 'react';
import {Link, useLocation} from 'react-router-dom';

const Gallery = ({itemsarr}) => {
  const location = useLocation();

  // A function to parse the query string and find the value of "cat"
  const getQueryParam = (queryParamName) => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(queryParamName);
  };

  // Get the category query parameter
  const cat = getQueryParam('cat');

  // Filter the items array to only include items that match the category query parameter
  // If no category is specified, show all items
  const filteredItems = cat
    ? itemsarr.filter((item) => {
        // Specifically replace "men's clothes" with "mens clothes"
        const adjustedCategory = item.category.toLowerCase().replace("men's clothes", "men clothes");
        // Now, split the adjusted category into words for a precise match
        const categoryWords = adjustedCategory.split(/\s+/);
        return categoryWords.includes(cat.toLowerCase()); // Check if the array of words includes the category exactly
      })
    : itemsarr;

  return (
    <div className="gallery-container">
      <div className="gallery">
        {filteredItems.map((item) => (
          <div className="img">
            <Link className='link' to={`/item/${item._id}`}>
              <img
                key={item.id}
                className="gallery__item"
                src={`http://localhost:3001/${item.productImage}.png`}
                alt=''
              />
            </Link>
            <div className="imgbox">
              <Link className='link' to={`/item/${item._id}`}>
                <div className="text">
                  <h6>{item.name}</h6>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
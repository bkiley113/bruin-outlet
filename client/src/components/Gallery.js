import React from 'react';
import {Link, useLocation} from 'react-router-dom';

const Gallery = ({itemsarr}) => {
  const location = useLocation();

  // Function to parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const cat = queryParams.get('cat');
  const searchQuery = queryParams.get('query');

  // Determine filtering logic based on the presence of 'cat' or 'query'
  let filteredItems = itemsarr;
  if (cat) {
    // Filter based on category
    filteredItems = itemsarr.filter((item) => {
      const adjustedCategory = item.category.toLowerCase().replace("men's clothes", "men clothes");
      const categoryWords = adjustedCategory.split(/\s+/);
      return categoryWords.includes(cat.toLowerCase());
    });
  } else if (searchQuery) {
    const searchTerms = decodeURIComponent(searchQuery).toLowerCase().split(' ');
    filteredItems = itemsarr.filter((item) => {
      // Normalize category for consistent comparison
      const itemCategory = item.category.toLowerCase().replace("men's", "men").replace("women's", "women");
  
      return searchTerms.some((term) => {
        if (term === "men") {
          // Ensure "men" does not match "women"
          return itemCategory.split(/\s+/).includes("men") && !itemCategory.includes("women");
        } else if (term === "women") {
          return itemCategory.includes("women");
        } else {
          // For other terms, simply check if the category includes the term
          return itemCategory.includes(term);
        }
      });
    });
  }

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
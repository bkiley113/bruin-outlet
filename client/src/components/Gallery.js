import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';

const Gallery = ({itemsarr}) => {
  const location = useLocation();

  // Function to parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const cat = queryParams.get('cat');
  const searchQuery = queryParams.get('query');
  const [notFoundFlag, setNotFoundFlag] = useState(false);
  const [filteredItems, setFilteredItems] = useState(itemsarr);

  useEffect(() => {
    let items = itemsarr;
    if (cat) {
      items = itemsarr.filter((item) => {
        const adjustedCategory = item.category.toLowerCase().replace("men's clothes", "men clothes");
        const categoryWords = adjustedCategory.split(/\s+/);
        return categoryWords.includes(cat.toLowerCase());
      });
    } else if (searchQuery != null) {
      const trimmedQuery = searchQuery.trim();
      if (trimmedQuery === '') {
        items = [];
        setNotFoundFlag(true);
      } else {
        const searchTerms = decodeURIComponent(trimmedQuery).toLowerCase().split(' ');
        items = itemsarr.filter((item) => {
          const itemCategory = item.category.toLowerCase().replace("men's", "men").replace("women's", "women");
          return searchTerms.some(term => {
            if (term === "men") {
              return itemCategory.split(/\s+/).includes("men") && !itemCategory.includes("women");
            } else if (term === "women") {
              return itemCategory.includes("women");
            } else {
              return itemCategory.includes(term);
            }
          });
        });
      }
    }
    setFilteredItems(items);
    setNotFoundFlag(items.length === 0);
  }, [cat, searchQuery, itemsarr]);

  return (
    <div className="gallery-container">
      {notFoundFlag ? (
        <h3>Sorry, we could not match any items to your search.</h3>
      ) : (
        <div className="gallery">
          {filteredItems.map((item) => (
            <div key={item.id} className="img"> {/* Ensure key is placed here for proper list rendering */}
              <Link className='link' to={`/item/${item._id}`}>
                <img
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
      )}
    </div>
  );
};


export default Gallery;
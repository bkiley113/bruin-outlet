import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../components/AuthContext.js";

const Wishlist = ({itemsarr}) => {
  const { authToken, userId } = useAuth();
  const navigate = useNavigate();
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    if (!authToken) {
      alert('Please create an account or log in to view your wishlist.');
      navigate('/');
      return; // Prevent further execution
    }
    fetchUserWishlist();
  }, [userId, authToken]); // Dependency array

  const fetchUserWishlist = async () => {
    const url = `http://localhost:3001/user/wishlist?_id=${userId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setWishlistIds(data.wishlist);
    } catch (error) {
      console.error('Failed to fetch user wishlist:', error);
    }
  };

  const removeItem = async (pid) => {
    // Assuming your server is set up to accept query parameters for DELETE request
    const url = `http://localhost:3001/user/wishlist?uid=${userId}&pid=${pid}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to remove item from wishlist');
      }
      
      // Optionally, refresh the wishlist to reflect the changes
      fetchUserWishlist();

      alert('Item removed from wishlist successfully');
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      alert('Error removing item from wishlist');
    }
  };

  const filteredItems = itemsarr.filter(item => wishlistIds.includes(item._id));
  return (
    <div>
      <h1 className="WL">Your Wishlist Items:</h1>
      <div className="wishlist-container">
        {filteredItems.length > 0 ? (
          <div className="gallery">
            {filteredItems.map((item) => (
              <div key={item._id} className="img">
                <Link className='link' to={`/item/${item._id}`}>
                  <img className="gallery__item" src={`http://localhost:3001/${item.productImage}.png`} alt='' />
                </Link>
                <div className="imgbox">
                  <Link className='link' to={`/item/${item._id}`}>
                    <div className="text">
                      <h6>{item.name}</h6>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                  </Link>
                  <button className="rm" onClick={() => removeItem(item._id)}>REMOVE FROM WISHLIST</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h4>No items yet. Explore the store and find out what you like!</h4>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
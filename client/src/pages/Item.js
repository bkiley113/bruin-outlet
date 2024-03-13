import React, {useState} from 'react'
import { useAuth } from "../components/AuthContext.js"

const Item = ({itemId, itemsarr}) => {
    const item = itemsarr.find(item => item._id === itemId);
    const [count, setCount] = useState(1);
    const { authToken, userId } = useAuth();
    const [responseMessage, setResponseMessage] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const handleIncrementCounter = () => {
        setCount((prevState) => Math.min(prevState + 1, 10)); // Assuming 100 is the maxValue
    };
    
    const handleDecrementCounter = () => {
        setCount((prevState) => Math.max(prevState - 1, 1)); // Assuming 0 is the minValue
    };

    const placeOrder = async () => {
        if (!authToken) {
            alert('Please log in to place an order.');
            return;
        }
        try {
            const requestBody = {
                uid: userId,
                quantity: count,
                pid: item._id,
            };
    
            if (item.category.includes("clothes")) {
                requestBody.size = selectedSize;
            }
            const response = await fetch('http://localhost:3001/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(requestBody),
            });
    
    
          if (!response.ok) {
            throw new Error('Something went wrong with placing the order');
          }
    
          // Handle response data here, e.g., confirmation message
          const data = await response.json();
          console.log('Order placed successfully:', data);
          alert('Order placed successfully');
        } catch (error) {
          console.error('Failed to place order:', error);
          alert('Failed to place order');
        }
      };


      const addToWishlist = async () => {
        if (!authToken) {
            alert('Please log in to add items to your wishlist.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/user/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({ 
                    uid: userId, 
                    pid: item._id,
                }),
            });
      
            const data = await response.json(); // Move this line inside the try block to catch parsing errors
            
            if (!response.ok) {
                // It's important to check response.ok after attempting to parse the response
                // This allows you to handle both network errors and non-2xx HTTP responses.
                throw new Error(data.message || 'Something went wrong with adding to wishlist');
            }
            
            console.log('Added to wishlist successfully:', data);
            setResponseMessage('Item added to wishlist successfully!');
            alert('Item added to wishlist successfully');
        } catch (error) {
            console.error('Failed to add to wishlist:', error);
            setResponseMessage('Failed to add to wishlist');
            alert('Failed to add to wishlist');
        }
    };

    const SizeSelector = () => {
    
        const handleSizeSelection = (size) => {
        setSelectedSize(size);
        };
  
        return (
            <div className="size-selector">
                <button className="size-option" onClick={() => handleSizeSelection('S')} style={{ backgroundColor: selectedSize === 'S' ? '#0174BE' : '',
            color: selectedSize === 'S' ? 'white' : '' }}>
                S
                </button>
                <button className="size-option" onClick={() => handleSizeSelection('M')} style={{ backgroundColor: selectedSize === 'M' ? '#0174BE' : '',
            color: selectedSize === 'M' ? 'white' : '' }}>
                M
                </button>
                <button className="size-option" onClick={() => handleSizeSelection('L')} style={{ backgroundColor: selectedSize === 'L' ? '#0174BE' : '',
            color: selectedSize === 'L' ? 'white' : '' }}>
                L
                </button>
            </div>
            );
    };

    const QuantityButton = ({ count, handleIncrementCounter, handleDecrementCounter}) => (
            <div className="btn-group">
                <button className="increment-btn" onClick={handleIncrementCounter}>
                    <span class="material-symbols-outlined">+</span>
                </button>
                <p>{count}</p>
                <button className="decrement-btn" onClick={handleDecrementCounter}>
                    <span class="material-symbols-outlined">-</span>
                </button>
            </div>
        );
    console.log(item)
    console.log(item.category);
    const noSize = item.category.includes("clothes") ? <SizeSelector/> : <p>N/A</p>;
    return (
    <div>
        <div className='itempage'>
        <div className='content'>
        <div className='mainimgcontainer'>
            <img src={`http://localhost:3001/${item.productImage}.png`} alt=''/>
        </div>
        <div className="divider">
            Details
        </div>
            <p>{item.description}</p>
        </div>
        <div className='sidebar'>
            <div className='info'>
                {item.name}
            </div>
            <div className='subtitle'>
                SKU:{item._id}
            </div>
            <div className="price">
                ${item.price.toFixed(2)}
            </div>
            <div className="divider">
                SIZE
            </div>
            {noSize}
            <div className="divider">
                QUANTITY
            </div>
            <QuantityButton count={count} handleIncrementCounter={handleIncrementCounter} handleDecrementCounter={handleDecrementCounter} />
            <div className="actions">
                <button onClick={placeOrder}>PLACE ORDER</button>
                <button onClick={addToWishlist}>ADD TO WISHLIST</button>
            </div>
        </div>
    </div>
    </div>
  );
}

export default Item;
import React from 'react'

const Cart = ({ cart, removeFromCart }) => {
    return (
      <div className="cart">
        <h2>Cart</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.title} - ${item.price.toFixed(2)}
                {/* Add a button to remove the item from the cart */}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    );
  };
  
  export default Cart;
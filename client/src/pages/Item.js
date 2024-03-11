import React, {useState} from 'react'

const Item = ({itemId, itemsarr, addToCart}) => {
    const item = itemsarr.find(item => item._id === itemId);

    const SizeSelector = () => {
    const [selectedSize, setSelectedSize] = useState('');
  
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

    const QuantityButton = ({ minValue = 0, maxValue = 100 }) => {
        const [count, setCount] = useState(minValue);
      
        const handleIncrementCounter = () => {
          if (count < maxValue) {
            setCount((prevState) => prevState + 1);
          }
        };
      
        const handleDecrementCounter = () => {
          if (count > minValue) {
            setCount((prevState) => prevState - 1);
          }
        };
      
        return (
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
        };
    console.log(itemId);
    return (
      <div className='itempage'>
      <div className='content'>
      <div className='mainimgcontainer'>
          <img src={item.img} alt=''/>
      </div>
      <div className="divider">
          Details
      </div>
          <p>{item.name}</p>
      </div>
      <div className='sidebar'>
          <div className='info'>
              {item.name}
          </div>
          <div className='subtitle'>
              SKU:{item._id}
          </div>
          <div className="price">
              ${item.price}
          </div>
          <div className="divider">
              SIZE
          </div>
          <SizeSelector/>
          <div className="divider">
              QUANTITY
          </div>
          <QuantityButton minValue={1} maxValue={10} />
          <div className="actions">
              {/* <button onClick={() => addToCart(itemsarr[index])}>ADD TO CART</button> */}
              <button>ADD TO WISHLIST</button>
          </div>
      </div>
  </div>
  );
}

export default Item;





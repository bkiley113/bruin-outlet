import React, {useState} from 'react'

const Item = ({itemId, itemsarr, addToCart}) => {
    const index = itemId - 1

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

    return (
        <div className='itempage'>
            <div className='content'>
            <div className='mainimgcontainer'>
                <img src={itemsarr[index].img} alt=''/>
            </div>
            <div className="divider">
                Details
            </div>
                <p>{itemsarr[index].desc}</p>
            </div>
            <div className='sidebar'>
                <div className='info'>
                    {itemsarr[index].title}
                </div>
                <div className='subtitle'>
                    SKU:{itemsarr[index].id}
                </div>
                <div className="price">
                    ${itemsarr[index].price.toFixed(2)}
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
                    <button onClick={() => addToCart(itemsarr[index])}>ADD TO CART</button>
                    <button>ADD TO WISHLIST</button>
                </div>
            </div>
        </div>
    )
}

export default Item;


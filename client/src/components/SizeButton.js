import React, { useState } from 'react';

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

export default SizeSelector;

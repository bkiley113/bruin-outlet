import React from 'react'
import {Link} from 'react-router-dom'
import QuantityButton from '../components/QuantityButton'
import SizeSelector from '../components/SizeButton'

const Item = ({itemId, itemsarr}) => {
   const index = itemId - 1
   console.log(itemsarr[index].title)
   console.log({itemId})
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
                    <button>ADD TO CART</button>
                    <button>ADD TO WISHLIST</button>
                </div>
            </div>
        </div>
    )
}

export default Item;


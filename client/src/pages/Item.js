import React from 'react'
import {Link} from 'react-router-dom'
import Sidebar from '../components/Sidebar'

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
            <div className='info'>
                {itemsarr[index].title}
            </div>
            <div className='subtitle'>
                {itemsarr[index].id}
            </div>
            <div className="price">
                ${itemsarr[index].price.toFixed(2)}
            </div>
            <div className="divider">
                Quantity
            </div>
            <div className="actions">
                <Link to={`/cart`}>
                <button>ADD TO CART</button>
                </Link>
                <Link to={`/cart`}>
                <button>ADD TO WISHLIST</button>
                </Link>
            </div>
            <h1>Product Description</h1>
                <p>{itemsarr[index].desc}
                </p>
            </div>
            <Sidebar/>
        </div>
    )
}

export default Item;


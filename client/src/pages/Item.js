import React from 'react'
import {Link} from 'react-router-dom'
import Sidebar from '../components/Sidebar'


const Item = () => {
    return (
        <div className='itempage'>
            <div className='content'>
            <div className='mainimgcontainer'>
                <img src="https://cdn.shoplightspeed.com/shops/616371/files/53697154/800x800x3/russell-athletic-ucla-joe-bear-bruins-pullover-hoo.jpg" alt=''/>
            </div>
            <div className='info'>
                MEN'S NAVY BLUE BRUIN BEAR HOODIE
            </div>
            <div className='subtitle'>
                SKU: 9780000484524-G
            </div>
            <div className="price">
                $70.00
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
            <h1>Lorem ipsum dolor sit amet consectetur</h1>
                <p>sample text entry here.sample text entry here.sample text entry here.
                sample text entry here.sample text entry here.sample text entry here.
                sample text entry here.sample text entry here.sample text entry here.sample text entry here.
                sample text entry here.sample text entry here.
                </p>
            </div>
            <Sidebar/>
        </div>
    )
}

export default Item


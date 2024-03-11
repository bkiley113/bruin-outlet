import React from 'react';
import {Link} from 'react-router-dom';

const items = [
  {
    id: 1, //this will be the SKU# (i.e. GHB6008J or something like that)
    title: "UCLA MENS HOODIE",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://cdn.shoplightspeed.com/shops/616371/files/53697154/800x800x3/russell-athletic-ucla-joe-bear-bruins-pullover-hoo.jpg",
    cat: "Men",
    price: 49.99,
  },
  {
    id: 2,
    title: "UCLA WOMEN'S T SHIRT",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cat: "Women",
    price: 59.99,
  },
  {
    id: 3,
    title: "UCLA KIDS SHORTSLEEVE",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cat: "Children",
    price: 69.99,
  },
  {
    id: 4,
    title: "UCLA FAN HAT",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cat: "Accessory",
    price: 79.99,
  },
  {
    id: 5, //this will be the SKU# (i.e. GHB6008J or something like that)
    title: "UCLA MENS HOODIE",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://cdn.shoplightspeed.com/shops/616371/files/53697154/800x800x3/russell-athletic-ucla-joe-bear-bruins-pullover-hoo.jpg",
    cat: "Men",
    price: 49.99,
  },
  {
    id: 6,
    title: "UCLA WOMEN'S T SHIRT",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cat: "Women",
    price: 59.99,
  },
  {
    id: 7,
    title: "UCLA KIDS SHORTSLEEVE",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cat: "Children",
    price: 69.99,
  },
  {
    id: 8,
    title: "UCLA FAN HAT",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    cat: "Accessory",
    price: 79.99,
  },
];

const Gallery = ({itemsarr}) => {
  return (
    <div className="gallery">
      {itemsarr.map((item) => (
        <div className="img">
          <Link className='link' to={`/item/${item._id}`}>
            <img
              key={item.id}
              className="gallery__item"
              src={item.productImg}
              alt=''
            />
          </Link>
          <div className="imgbox">
            <Link className='link' to={`/item/${item._id}`}>
              <div className="text">
                <h6>{item.name}</h6>
                <p>${item.price}</p>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
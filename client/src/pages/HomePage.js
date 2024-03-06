import React from 'react'
import image1 from "../images/store.jpg"
import image2 from "../images/crowd.jpg"
import image3 from "../images/ppl.webp"
import SearchBar from "../components/SearchBar.js"
import {Link} from 'react-router-dom'

// export default HomePage
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

//DUMMY DATA IGNORE THIS
  const items = [
    {
      id: 1, //this will be the SKU# (i.e. GHB6008J or something like that)
      title: "UCLA MENS HOODIE",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://cdn.shoplightspeed.com/shops/616371/files/53697154/800x800x3/russell-athletic-ucla-joe-bear-bruins-pullover-hoo.jpg",
      cat: "Men",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      cat: "Women",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      cat: "Children",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      cat: "Accessory",
    },
  ];


const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000'
}

const divStyle = {

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '400px'
}
const slideImages = [
  {
    url: image1,
    caption: 'Slide 1'
  },
  {
    url: image2,
    caption: 'Slide 2'
  },
  {
    url: image3,
    caption: 'Slide 3'
  },
];

const Homepage = ({itemsarr}) => {
  const yourRunFunction = (userInput) => {
    // Do something with the user input, for example, log it to the console
    console.log('Search triggered with input:', userInput);
    // You can perform any other actions or update the state in your HomePage component here
  };
  return (
    <div>
      <SearchBar run={yourRunFunction} />
      <Slide>
        {slideImages.map((slideImage, index)=> (
          <div key={index}>
            <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              <span style={spanStyle}>{slideImage.caption}</span>
            </div>
          </div>
        ))} 
      </Slide>
      <div className='main'>
        <div className='items'>
          {itemsarr.map(item=>(
            <div className='item' key={item.id}>
              <div className='img'>
                <img src ={item.img} alt=""/>
              </div>
              <div className='content'>
                <Link className='link' to={`/item/${item.id}`}>
                  <h1>{item.title}</h1>
                </Link>
                <p>{item.desc}</p>
                <button>More Info</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Homepage;
import React from 'react'
import search_icon from "../images/search_icon.png"
import image1 from "../images/store.jpg"
import image2 from "../images/crowd.jpg"
import image3 from "../images/ppl.webp"
import SearchBar from "../components/SearchBar.js"

// const HomePage = () => {
//     return (
//         <div className = 'homepage'>
//             <input type ="text" placeholder='Search for Products'/>
//             <img src={search_icon} alt="" />
//             <button>GO</button>
//         </div>
//     )
// }

// export default HomePage
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

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

const Homepage = () => {
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
      <span>BEST SELLERS</span>
    </div>
  )
}

export default Homepage;
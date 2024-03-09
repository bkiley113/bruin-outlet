import React from 'react'
import image1 from "../images/store.jpg"
import image2 from "../images/crowd.jpg"
import image3 from "../images/ppl.webp"
import SearchBar from "../components/SearchBar.js"
import Gallery from '../components/Gallery.js'
import {Link} from 'react-router-dom'

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

const Homepage = ({itemsarr}) => {
  const searchRunFunction = (userInput) => {
    console.log('Search triggered with input:', userInput);
  };
  return (
    <div>
      <SearchBar run={searchRunFunction} />
      <Slide>
        {slideImages.map((slideImage, index)=> (
          <div key={index}>
            <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
            </div>
          </div>
        ))} 
      </Slide>
      <Gallery></Gallery>
    </div>
  )
}

export default Homepage;
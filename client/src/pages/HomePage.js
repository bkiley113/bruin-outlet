import React from 'react'
import image1 from "../images/slideshow/store.jpg"
import image2 from "../images/slideshow/crowd.jpg"
import image3 from "../images/slideshow/ppl.webp"
import SearchBar from "../components/SearchBar.js"
import Gallery from '../components/Gallery.js'
import {useSearchParams} from 'react-router-dom'

// export default HomePage
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

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

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const Homepage = ({itemsarr}) => {
  const images = importAll(require.context('../images/clothingbanners', false, /\.(png|jpe?g|svg)$/));
  const [searchParams] = useSearchParams();
  const cat = searchParams.get('cat');
  const searchRunFunction = (userInput) => {
    console.log('Search triggered with input:', userInput);
  };
  return (
    <div>
      <SearchBar />
      {cat ? (
        <div className='banner'>
          <img src={images[`${cat}.png`]} alt=''/>
        </div>
      ) : (
        <div>
          <Slide>
            {slideImages.map((slideImage, index) => (
              <div key={index} className="each-slide">
                <div style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}>
                </div>
              </div>
            ))}
          </Slide>
        </div>
      )}
      <Gallery itemsarr={itemsarr}></Gallery>
    </div>
  )
}

export default Homepage;
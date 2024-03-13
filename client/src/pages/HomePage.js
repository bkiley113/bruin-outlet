import React, {useEffect} from 'react'
import image1 from "../images/slideshow/store.jpg"
import image2 from "../images/slideshow/crowd.jpg"
import image3 from "../images/slideshow/ppl.webp"
import SearchBar from "../components/SearchBar.js"
import Gallery from '../components/Gallery.js'
import {useSearchParams} from 'react-router-dom'

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

  useEffect(() => {
    document.title = 'UCLAoutlet'
  })



  const images = importAll(require.context('../images/clothingbanners', false, /\.(png|jpe?g|svg)$/));
  const [searchParams] = useSearchParams();
  const cat = searchParams.get('cat');
  return (
    <div>
      <SearchBar />
      {cat ? (
        <div className='bannercont'>
          <div className='banner'>
            <img src={images[`${cat}.png`]} alt=''/>
          </div>
          <h1 className='bannersub' style={{ display:'flex', borderBottom: '2px solid #000', position: 'relative', top: '20px' }}>
          </h1>
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
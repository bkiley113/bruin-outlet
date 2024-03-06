import React from 'react'
import SearchBar from "../components/SearchBar.js"

const Sidebar = () => {

    const items = [
        {
          id: 1,
          title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
          desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
          img: "https://cdn.shoplightspeed.com/shops/616371/files/53699561/image.jpg",
          cat: "Men",
        },
        {
          id: 2,
          title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
          desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
          img: "https://fanatics.frgimages.com/ucla-bruins/mens-colosseum-blue-ucla-bruins-arch-and-logo-30-pullover-hoodie_pi4333000_ff_4333378-44fbea277bb80c26430f_full.jpg?_hv=2&w=340",
          cat: "Women",
        },
        {
          id: 3,
          title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
          desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
          img: "https://cdn.shoplightspeed.com/shops/616371/files/22920463/image.jpg",
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
      const yourRunFunction = (userInput) => {
        // Do something with the user input, for example, log it to the console
        console.log('Search triggered with input:', userInput);
        // You can perform any other actions or update the state in your HomePage component here
      };

    return (
        <div className='sidebar'>
            <h1>
                Other items you may like
            </h1>
            {items.map(item=>(
                <div className="item" key={(item.id)}>
                    <img src={item.img} alt="" />
                    <h2>{item.title}</h2>
                    <button>See More</button>
                </div>
            ))}
        </div>
    )
}

export default Sidebar;
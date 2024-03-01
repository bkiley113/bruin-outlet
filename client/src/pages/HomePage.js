import React from 'react'
import search_icon from "../images/search_icon.png"

const HomePage = () => {
    return (
        <div className = 'homepage'>
            <input type ="text" placeholder='Search for Products'/>
            <img src={search_icon} alt="" />
            <button>GO</button>
        </div>
    )
}

export default HomePage
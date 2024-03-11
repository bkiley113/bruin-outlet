import React from 'react'
import SearchBar from '../components/SearchBar'
import Gallery from '../components/Gallery'

const Results = ({itemsarr}) => {
    
    return (
        <div className='results'>
            <SearchBar />
            <h1>Search Results:</h1>
            <Gallery itemsarr={itemsarr}></Gallery>
        </div>
    )
}

export default Results
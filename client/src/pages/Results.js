import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import Gallery from '../components/Gallery'

const Results = ({itemsarr}) => {
    return (
        <div className='results'>
            <SearchBar />
            <Gallery itemsarr={itemsarr}></Gallery>
        </div>
    )
}

export default Results
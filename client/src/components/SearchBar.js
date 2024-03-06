import React from 'react';
import search_icon from "../images/search_icon.png"

class SearchBar extends React.Component{
    state = {userinput:''};

    searchbarsearch=(event)=>{
        event.preventDefault();
        
        this.props.run(this.state.userinput);
    };

    render()
         
    {
        return (
            <div>
                <form onSubmit={this.searchbarsearch}>
                <div>
                    <input type='text' placeholder='Search for products . . .'
                    onChange={e=>this.setState({userinput : e.target.value})}
                    value = {this.state.userinput}
                    className='searchbar'
                    />
                 </div>
                 <img 
                    src={search_icon}
                    alt=''
                    className='search_icon'
                />
                <button class="go_button">
                    GO
                </button>
                </form>
            </div>
        )
    }
}
export default SearchBar;
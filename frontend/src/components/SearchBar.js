import React, { Component } from 'react';
import * as Icon from 'react-bootstrap-icons';

class SearchBar extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            movies: [],
            title: '',
            searchTerm: '',
            totalResults: 0,
        }
        this.apiKey = '1027a01020b01c3266e0531dc4542a8a'
    }
    
    handleChange = (e) => {
      this.setState({searchTerm: e.target.value})
    }

    moveSearchMovie = () => {
        document.location.href='searchMovie';
    }

    handleSubmit = (e) => {
      e.preventDefault();
      if (sessionStorage.getItem("movies") != null) {

        sessionStorage.removeItem("movies");
          if(this.state.searchTerm !== '') {
              fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`)
              .then(data => data.json())
              .then(data => {
                this.setState({movies: [data.results]})
                window.sessionStorage.setItem("movies", JSON.stringify(this.state.movies));
                this.moveSearchMovie();

            })
          }
          else {
              alert('Please enter a search term');
          }
        }
      else if (sessionStorage.getItem("movies") == null) {
            if(this.state.searchTerm !== '') {
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`)
                  .then(data => data.json())
                  .then(data => {
                    this.setState({movies: [data.results]})
                    window.sessionStorage.setItem("movies", JSON.stringify(this.state.movies));
                    this.moveSearchMovie();

                })
              }
              else {
                  alert('Please enter a search term');
              }
            }
    }

    render() {
        return (
            <div>
                <form className="form-inline" action="" onSubmit={this.handleSubmit}>
                    <div className="input-field0">
                        <input
                            className="form-control mr-sm-2"
                            type="text" placeholder="Search...."
                            onChange={this.handleChange}
                        />
                        <button
                            className="btn btn-warning"
                            type="submit"

                        >
                            <Icon.Search className='bg-warning'/>
                        </button>

                        </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;
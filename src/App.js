import React, {Component} from 'react';
import logo from './logo.png';
import './App.css';
import MovieRow from './components/MovieRow';
import $ from 'jquery';



class App extends Component {
  constructor(props){
    super(props)
    this.state = {}

    



    this.performSearch();
  }

performSearch(){
  console.log("Perform search using moviesdb")
  const urlString = "https://api.themoviedb.org/3/search/movie?query=marve&api_key=1b5adf76a72a13bad99b8fc0c68cb085"
  $.ajax({
    url: urlString,
    success: (searchResults) => {
      const results = searchResults.results

      let movieRows = []

      results.forEach((movie) => {
        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
        const movieRow = <MovieRow key={movie.id} movie = {movie}/>
        movieRows.push(movieRow)
      })

      this.setState({rows: movieRows})
    },
    error: (xhr, status, err) => {

    }
  })
}

searchChangeHandler(event) {
  const boundObject = this
  const searchTerm = event.target.value
  boundObject.performSearch(searchTerm)
}

  render() {
    return (
       <div>

         <table className="titleBar">
           <tbody>
             <tr>
               <td>
                 <img width="50" src={logo}/>
               </td>
               <td>
                 <h1>MoviesDB Search</h1>
               </td>
             </tr>
           </tbody>
         </table>

         <input style={{
           fontSize: 24,
           display: 'block',
           width: "99%",
           paddingTop: 8,
           paddingBottom: 8,
           paddingLeft: 16
        }}onChange={this.searchChangeHandler.bind(this)} placeholder="Search for a movie, tv show, person..."/>

        {this.state.rows}
         
       </div>
    );
  }
}

export default App;

// Compleated all the pre-work for git pages
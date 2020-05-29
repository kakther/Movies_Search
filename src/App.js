import React, {Component} from 'react';
import logo from './logo.png';
import './App.css';
import MovieRow from './components/MovieRow';
import $ from 'jquery';



class App extends Component {
  constructor(props){
    super(props)
    this.state = {}


    // console.log("this is my in");

    // const movies = [
    //   {id: 0, poster_src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfbN7KsqHgs39wOf8EYZh_ZZXaNuFMlLFmJK83cRFsOy5OexArGw&s", title: "Avengers: Infinity War", overview: "Add another layer to your designs with our new duotone icons, available as part"},
    //   {id: 1, poster_src: "https://i.ytimg.com/vi/Acg6hkEzQqY/maxresdefault.jpg", title: "Avengers", overview: "Get vector icons and social logos on your website with Font Awesome, the web's most popular icon set"},

    // ]

    

    // let movieRows = [] 
    // movies.forEach((movie) => {
    //   const movieRow = <MovieRow movie={movie}/>
    //   movieRows.push(movieRow);
    // })

    // this.state = {rows: movieRows}

    this.performSearch();
  }

performSearch(){
  console.log("Perform search using moviesdb")
  const urlString = "https://api.themoviedb.org/3/search/movie?query=marve&api_key=1b5adf76a72a13bad99b8fc0c68cb085"
  $.ajax({
    url: urlString,
    success: (searchResults) => {
      // console.log("Fetchced data successfully")
      // console.log(searchResults);
      const results = searchResults.results
      // console.log(results[0])

      let movieRows = []

      results.forEach((movie) => {
        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
        // console.log(movie.title)
        const movieRow = <MovieRow key={movie.id} movie = {movie}/>
        movieRows.push(movieRow)
      })

      this.setState({rows: movieRows})
    },
    error: (xhr, status, err) => {
      // console.error("Failed to fetch data")
            // console.error("Failed to fetch data")

    }
  })
}

searchChangeHandler(event) {
  // console.log(event.target.value)
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
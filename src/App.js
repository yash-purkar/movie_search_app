import React, { useEffect, useState } from "react";
import "./App.css";
import Img from './img.jpg'

//IMP - It'll give most popular movies
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

// IMP  - Base url of image
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

// IMP - It'll give movies on a search
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [moviesData, setMoviesData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // const handleChange = (e) => {
  //   // console.log(e.target.value);
  //   fetch(SEARCHAPI + e.target.value)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  //   // getMovies(SEARCHAPI + e.target.value);
  // }

  const getMovies = async (api) => {
    let response = await fetch(api);
    let data = await response.json();
    setMoviesData(data.results);

  }

  const handleSearchBtn = () => {
    if (searchValue) {

      fetch(SEARCHAPI + searchValue)
        .then((res) => res.json())
        .then((data) => {
          setMoviesData([]);
          setMoviesData(data.results);
          console.log(data)
        });
    }
    else {
      getMovies(APIURL)
    }
  }

  useEffect(() => {
    getMovies(APIURL);
  }, [])

  return (

    <div className="main">
      <div className="searchBar">
        <input type="search" id="search" autoFocus autoComplete="off" placeholder="Search Here" onChange={(e) => setSearchValue(e.target.value)} />
        <button onClick={handleSearchBtn}>Search</button>
      </div>

      {
        moviesData.map((movie, i) => {
          return (
            <div className="box" key={i}>
              <img src={movie.poster_path === null ? Img : IMGPATH + movie.poster_path} alt="img" id="img" />
              <div className="overlay">
                <div className="title">
                  <h2>{movie.original_title}</h2>

                  <span>{movie.vote_average}</span>
                </div>
                <h3>Overview</h3>
                <p>{movie.overview}</p>

              </div>
            </div>
          )
        })
      }


    </div>


  );
}

export default App;

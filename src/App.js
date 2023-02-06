import React, { useEffect, useState } from "react";
import Img from "./img.jpg";
import "./App.css";
import { computeHeadingLevel } from "@testing-library/react";

//IMP - It'll give most popular movies
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

// IMP  - Base url of image
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

// IMP - It'll give movies on a search
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [moviesData, setMoviesData] = useState([]);


  useEffect(() => {
    fetch(APIURL)
      .then((res) => res.json())
      .then((data) => setMoviesData(data.results));
  }, [])

  return (

    <div className="main">
      <div className="searchBar">
        <input type="search" id="search" autoFocus autoComplete="off" placeholder="Search Here" />
      </div>

      {
        moviesData.map((movie) => {
          return (
            <div className="box">
              <img src={Img} alt="" id="img" />
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

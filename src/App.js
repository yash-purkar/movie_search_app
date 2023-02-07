import React, { useEffect, useState } from "react";
import "./App.css";
import Movies from "./Compoents/Movies";

//IMP - It'll give most popular movies
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

// IMP  - Base url of image
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

// IMP - It'll give movies on a search
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [moviesData, setMoviesData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [resultMsg, setResultMsg] = useState("");
  const [loading, setLoading] = useState(true);


  const getMovies = async (api) => {
    let response = await fetch(api);
    let data = await response.json();
    setTimeout(() => {
      setLoading(true);
    });
    setTimeout(() => {
      setMoviesData(data.results);
      setLoading(false);
    }, 2000);

  }

  //TODO: ADD LODING TEXT AND THEN POST IT ON TWIITER AND LINKDIN

  const handleSearchBtn = () => {
    if (searchValue) {
      setTimeout(() => {
        setLoading(true);
      });

      fetch(SEARCHAPI + searchValue)
        .then((res) => res.json())
        .then((data) => {
          setMoviesData([]);
          setTimeout(() => {
            setLoading(true);
          });

          setTimeout(() => {
            setMoviesData(data.results);
            setLoading(false);
          }, 2000);
          // console.log(data);
          setResultMsg(`Search results for ${searchValue}`);
        });
    }
    else {
      getMovies(APIURL);
      setResultMsg("");
    }
  }

  useEffect(() => {
    getMovies(APIURL);
  }, [])
  // console.log(moviesData);

  return (

    <>
      <div className="main">
        <div className="nav">
          <h1>Movies</h1>
          <div className="searchBar">
            <input type="search" id="search" autoFocus autoComplete="off" placeholder="Search Here" onChange={(e) => setSearchValue(e.target.value)} />
            <button id="btn" onClick={handleSearchBtn}>Search</button>
          </div>
        </div>

        {loading ? <p id="loader">
          <div>
            <span id="loading">Loading</span>
            <span id="dot1">.</span>
            <span id="dot2">.</span>
            <span id="dot3">.</span>
          </div>

        </p> : <><h2 id="resultMsg">{resultMsg}</h2><div className="container">
          {
            moviesData.map((movie, i) => {
              return (
                <Movies key={i} moviesData={movie} imgUrl={IMGPATH} />
              )
            })
          }

        </div></>}


      </div>

    </>
  );
}

export default App;

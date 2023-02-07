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
    setResultMsg("");
    setSearchValue("")
    let response = await fetch(api);
    let data = await response.json();
    setTimeout(() => {
      setLoading(true);
    });
    setTimeout(() => {
      setMoviesData(data.results);
      setLoading(false);
    }, 2300);

  }

  //TODO: ADD LODING TEXT AND THEN POST IT ON TWIITER AND LINKDIN

  const handleSearchBtn = () => {
    setMoviesData([]);
    if (searchValue) {
      setTimeout(() => {
        setLoading(true);
      });

      fetch(SEARCHAPI + searchValue)
        .then((res) => res.json())
        .then((data) => {
          setMoviesData([]);
          let msg = data.results.length > 0 ? `Search results for ${searchValue}` : `No data found`;
          console.log(data)
          setResultMsg(msg);
          setTimeout(() => {
            setLoading(true);

          });

          setTimeout(() => {
            setMoviesData(data.results);

            setLoading(false);
          }, 2300);
          // console.log(data);

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
  console.log(moviesData);

  return (

    <>
      <div className="main">
        <div className="nav">
          <h1>Movies</h1>
          <div className="searchBar">
            <input type="search" id="search" autoFocus autoComplete="off" placeholder="Search Here" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <button id="btn" onClick={handleSearchBtn}>Search</button>
          </div>
        </div>

        {loading ? <section id="loader">
          <p>
            <span id="loading">Loading</span>
            <span id="dot1">.</span>
            <span id="dot2">.</span>
            <span id="dot3">.</span>
          </p>

        </section> : <><h2 id="resultMsg">{resultMsg}</h2><div className="container">
          {
            moviesData.map((movie, i) => {
              return (
                <>{
                  moviesData ? <Movies key={i} moviesData={movie} imgUrl={IMGPATH} />
                    : console.log("NO data found")}

                </>)
            })
          }

        </div></>}


      </div>

    </>
  );
}

export default App;

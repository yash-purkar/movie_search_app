import React from 'react'
import Img from '../img.jpg';

function Movies({ moviesData, imgUrl }) {
  // console.log(moviesData);
  const { original_title, poster_path, vote_average, overview } = moviesData;


  return (
    <div className="box" >
      <img src={poster_path === null ? Img : imgUrl + poster_path} alt="img" id="img" />
      <div className="title">
        <h2 id="movieName">{original_title}</h2>
        <span id={vote_average > 7 ? "green" : "red"}><span id="star">⭐</span>{vote_average}</span>
      </div>
      <div className="overview">
        <h3 id="overviewHead">Overview</h3>
        <p>{overview.substring(1, 150)}....</p>

      </div>
    </div >
  )
}

export default Movies
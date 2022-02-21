import React, { useState } from "react";
import DisplayMovies from "./DisplayMovies";

function Search() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [movieResponse, setMovieResponse] = useState([]);
  // const [currentPage, setcurrentPage] = useState(1);

  // const pages = [];
  // for (let i = 0; i < Object.keys(movieResponse).length/5; i++){
  //   pages.push(i)
  // }

  const handleSubmission = (e: any) => {
    e.preventDefault();
    const url = "https://www.omdbapi.com/?";

    const fetchData = async () => {
      const response = await fetch(
        url +
          new URLSearchParams({
            apikey: "cec03a06",
            s: title,
            y: year,
          })
      ).then((res) => res.json());
      console.log(response);
      setMovieResponse(response.Search);
    };

    fetchData();
  };

  return (
    <div>
      <h1>Movie Searcher</h1>
      <form onSubmit={handleSubmission}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {movieResponse.length ? (
        <DisplayMovies movies={movieResponse} />
      ) : (
        <div>Please Enter Movie name above</div>
      )}
    </div>
  );
}

export default Search;

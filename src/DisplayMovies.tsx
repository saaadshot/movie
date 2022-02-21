import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function DisplayMovies(props: any) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [movieResponse, setMovieResponse]: any = useState({});

  const KnowMore = (imdbID: string) => {
    const url = "https://www.omdbapi.com/?";

    const fetchData = async () => {
      const response = await fetch(
        url +
          new URLSearchParams({
            i: imdbID,
            plot: "full",
            apikey: "cec03a06",
          })
      ).then((res) => res.json());
      console.log(response);
      setMovieResponse(response);
    };

    fetchData();
    setModalIsOpen(true);
  };

  return (
    <div>
      {props.movies.map(
        (movieInfo: {
          Title: string;
          Year: string;
          imdbID: string;
          Poster: string;
        }) => {
          return (
            <div key={movieInfo.imdbID}>
              <h2>{movieInfo.Title}</h2>
              <div>{movieInfo.Year}</div>
              <img src={movieInfo.Poster} alt={movieInfo.Title}></img>
              <button onClick={() => KnowMore(movieInfo.imdbID)}>
                Know More
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                  overlay: {
                    backgroundColor: "grey",
                  },
                }}
              >
                <div>
                  <h3>{movieResponse.Title}</h3>
                  <p>Release Date</p>
                  <div>{movieResponse.Country}</div>
                  <p>{movieResponse.Plot}</p>
                  <div>imdb Rating: {movieResponse.imdbRating}</div>
                  <br></br>
                  {(() => {
                    if (parseInt(movieResponse.imdbRating) >= 7)
                      return <b>boxoffice: hit</b>;
                    else return <b>boxoffice: flop</b>;
                  })()}
                  <button onClick={() => setModalIsOpen(false)}>Close</button>
                </div>
              </Modal>
            </div>
          );
        }
      )}
    </div>
  );
}
export default DisplayMovies;

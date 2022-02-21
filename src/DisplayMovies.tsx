import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function DisplayMovies(props: any) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ImdbID, setImdbID] = useState("");
  const [movieResponse, setMovieResponse] = useState([]);

  const ShowModal = (movieResponse: any) => {
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={{
        overlay: {
          backgroundColor: "grey",
        },
      }}
    >
      {movieResponse.map(
        (movieDetails: {
          Title: string;
          Country: string;
          imdbRating: string;
          Plot: string;
        }) => {
          return (
            <div>
              <h3>{movieDetails.Title}</h3>
              <div>{movieDetails.Country}</div>
              <div>{movieDetails.Plot}</div>
              {(() => {
                if (parseInt(movieDetails.imdbRating) >= 7)
                  return <div>boxoffice: hit</div>;
                else return <div>boxoffice: flop</div>;
              })()}
              <button onClick={() => setModalIsOpen(false)}>Close</button>
              {setMovieResponse([])}
            </div>
          );
        }
      )}
    </Modal>;
  };

  const KnowMore = (imdbID: string) => {
    const url = "https://www.omdbapi.com/?";
    setImdbID(imdbID);
    console.log(`imdB setted to ${imdbID}`);

    const fetchData = async () => {
      const response = await fetch(
        url +
          new URLSearchParams({
            i: ImdbID,
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
              {movieResponse.length ? ShowModal(movieResponse) : null}
            </div>
          );
        }
      )}
    </div>
  );
}
export default DisplayMovies;

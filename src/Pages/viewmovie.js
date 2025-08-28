import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from "../Global.js";
import axios from 'axios';
import "./viewmovie.css"; // We'll create this

function ViewMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${API}/api/recommend/${id}`);
        setMovie(response.data.movie);
      } catch (error) {
        console.log("Error fetching movie details:", error);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p className="text-center mt-5">Loading movie details...</p>;

  return (
    <div className="movie-details-container">
      {/* Left: Movie Poster */}
      <div className="movie-image-section">
        <img
          src={movie.image || "/default-poster.jpg"}
          alt={movie.moviename}
          className="movie-image"
        />
      </div>

      {/* Right: Movie Info */}
      <div className="movie-info-section">
        <h2>{movie.moviename}</h2>
        <p><strong>About:</strong> {movie.aboutmovie}</p>
        <p><strong>Cast:</strong> {movie.cast}</p>
      </div>
    </div>
  );
}

export default ViewMovie;

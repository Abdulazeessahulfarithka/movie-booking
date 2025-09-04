import axios from 'axios';
import React, { useEffect, useState } from 'react';
import API from '../Global.js';
import { Link } from 'react-router-dom';
import './Movies.css';

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API}/api/movie/all`);
        console.log(response.data);
        setMovies(response.data.movies || []);
      } catch (error) {
        console.log('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="movie-container">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie._id} className="movie" style={{ width: '18rem' }}>
            <img
              src={movie.image || '/default-poster.jpg'}
              className="movie-img-top"
              alt={movie.moviename}
            />
            <div className="card-body">
              <h5 className="card-title">{movie.moviename}</h5>
              <p className="card-text">{movie.aboutmovie?.slice(0, 80) || 'No description available.'}...</p>
              <Link to={`/bookticket/${movie._id}`} className="btn btn-secondary ms-2">
                Book Ticket
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No movies found.</p>
      )}
    </div>
  );
}

export default Movies;

import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./upcomingMovies.css";
import API from "../Global.js";
import axios from 'axios';

function UpcomingMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`${API}/api/recommend/all`);
        console.log(response.data);
        setMovies(response.data.movies || []);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    };
    fetchdata();
  }, []);

  return (
    <>
      <h2 className="text-center">Recommended Movies</h2>
      <div className="card-container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie._id || movie.moviename} className="card" style={{ width: "18rem" }}>
              <img
                src={movie.image || "/default-poster.jpg"}
                className="card-img-top"
                alt={movie.moviename}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.moviename}</h5>
                <Link
                  to={`/viewmovie/${movie._id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No movies found.</p>
        )}
      </div>
    </>
  );
}

export default UpcomingMovies;

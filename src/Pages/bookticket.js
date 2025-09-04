import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API from '../Global.js';
import './bookticket.css';

function BookTicket() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get movie ID from URL

  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [time, setTime] = useState('7:30 PM');
  const [ticketPrice] = useState(200);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  // Fetch specific movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${API}/api/movie/${id}`);
        console.log(response.data);
        setMovie(response.data.movie);
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }

    setBooking(true);
    try {
      const response = await axios.post(`${API}/api/ticket/book`, {
  time,
  seats: selectedSeats,
  movieId: movie._id, // pass the movie ID
});
;

      if (response.data.success) {
        navigate('/payment');
      } else {
        alert(response.data.message || 'Booking failed!');
      }
    } catch (error) {
      console.error('Booking error:', error.response?.data || error);
      alert(error.response?.data?.message || 'Booking failed!');
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <p>Loading movie details...</p>;
  if (!movie) return <p>Movie not found.</p>;

  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 10;

  return (
    <div className="book-ticket-container">
      <div className="movie-details">
        <img src={movie.image || '/default-poster.jpg'} alt={movie.moviename} />
        <h2>{movie.moviename}</h2>
        <p>{movie.description || 'No description available.'}</p>
      </div>

      <div className="time-selection">
        <label>Select Showtime:</label>
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          <option>7:30 PM</option>
          <option>10:00 PM</option>
          <option>1:00 PM</option>
          <option>4:00 PM</option>
        </select>
      </div>

      <div className="seat-selection">
        <h4>Select Your Seats</h4>
        {rows.map((row) => (
          <div key={row} className="seat-row">
            {Array.from({ length: seatsPerRow }, (_, i) => {
              const seat = `${row}${i + 1}`;
              const isSelected = selectedSeats.includes(seat);
              return (
                <button
                  key={seat}
                  className={`seat ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleSeat(seat)}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="booking-summary">
        <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
        <p>Total Price: ₹{selectedSeats.length * ticketPrice}</p>
        <button
          className="btn btn-primary"
          onClick={handleBooking}
          disabled={booking}
        >
          {booking ? 'Booking...' : 'Book Now'}
        </button>
      </div>
    </div>
  );
}

export default BookTicket;

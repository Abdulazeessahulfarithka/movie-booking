  import React, { useState } from "react";
  import { Link, NavLink } from "react-router-dom";

  function Header() {
    const[location,setLocation]=useState()
    const [auth, setAuth] = useState("");

    const handleSubmit=()=>{
      setAuth({
        ...auth,
        user:null,
        token:"",

      })
    }

    // Detect user location using Geolocation API
    const detectLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            setLocation(mapsUrl); // Store Google Maps URL
            window.open(mapsUrl, "_blank"); // Open in new tab
          },
          (error) => {
            alert("Location access denied or unavailable.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    };

    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-nav">
          
          {/* Logo */}
          <Link className="navbar-brand" to={"/"}>🎟 Book Tickets</Link>
          
          {/* Toggler for mobile view */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Search bar with detect location */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form-inline ml-auto">
              <input 
                className="form-control mr-sm-2" 
                type="search" 
                placeholder="Search for theaters or cities" 
                aria-label="Search" 
              />
              <button 
                className="btn btn-outline-primary my-2 my-sm-0 mr-2" 
                type="button"
                onClick={detectLocation}
              >
                📍 Detect My Location
              </button>
            </form>
          </div>
          <NavLink className="btn btn-primary" to={"/login"}>Login</NavLink>
        </nav>
      </div>
    );
  }

  export default Header;

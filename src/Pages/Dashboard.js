import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className='dashboard-container'>
      <div className='content-box'>
        <h1 className='nerko-one-regular'>Stream Now</h1>
        <Link to="/movie" className='btn btn-primary'>Movies Now</Link>
      </div>
    </div>
  );
}

export default Dashboard;

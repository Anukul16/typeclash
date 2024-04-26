import React from 'react';
import '../styles/Room.css'; // Import CSS file for styling

const Room = () => {
  return (
    <div className="room-card">
      <img src="assets/pic.jpg" alt="Room Image" className="room-image" />
      <div className="room-details">
        <h2 className="title">Room Title</h2>
        <p className="description">Description of the room...</p>
        <p className="price">Price: $100</p>
      </div>
    </div>
  );
}

export default Room;

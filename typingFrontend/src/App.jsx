import React from 'react';
import Navbar from '../src/components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Leaderboard from './navitems/Leaderboard';
import Room from './navitems/Room';
import Login from './navitems/Login';
import Signup from './navitems/Signup';
import Testcontainer from './components/Testcontainer';
import Resetpassword from './components/Resetpassword';

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Testcontainer />} />
            <Route exact path="/leaderboard" element={<Leaderboard />} />
            <Route exact path="/room" element={<Room />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path='/reset-password' element={<Resetpassword />}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

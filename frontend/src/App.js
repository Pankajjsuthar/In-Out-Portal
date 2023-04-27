
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Test1 from './components/test/test1.js';
import Homepage from './components/Homepage/HomePage';
import Signup from './components/signup/signup';
import Inticket from './components/Inticket/inticket';
import Outticket from './components/Outticket/outticket';
import Login from './components/Login/Login';
import GuardPage from './components/guard/guard';
import Dashboard_client from './components/Dashboard_client/Dashboard';
import React from 'react';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/test' element={<Test1 />} />
          <Route exact path='/homepage' element={<Homepage />} />
          <Route exact path='/inticket' element={<Inticket />} />
          <Route exact path='/outticket' element={<Outticket />} />
          <Route exact path='/guard' element={<GuardPage />} />
          <Route exact path='/client-dashboard' element={<Dashboard_client />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import Twitter from './components/Twitter';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthContext } from './context/authContext';

import './App.css';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route strict exact path='/' element={<HomePage />} />
        <Route strict exact path='/login' element={<Login />} />
        <Route strict exact path='/register' element={<Register />} />
        <Route
          strict
          exact
          path='/tweets'
          element={user ? <Twitter /> : <HomePage />}
        />
      </Routes>
    </div>
  );
}

export default App;

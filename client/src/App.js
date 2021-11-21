import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './components/Home';
// import testTemperaments from './components/testTemperaments';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CreateDog from './components/CreateDog/CreateDog';
import { DogDetails } from './components/Details/Details';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <h1>Henry Dogs</h1> */}
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/dog" element={<CreateDog />}></Route>
          <Route path="/dogs/:id" element={<DogDetails />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

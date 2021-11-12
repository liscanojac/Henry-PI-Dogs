import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Henry Dogs</h1>
        <Route exact path='/dogs' component={Home} />
      </div>
    </BrowserRouter>
    
  );
}

export default App;

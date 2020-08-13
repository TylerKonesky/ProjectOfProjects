import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import QuoteGenerator from './Components/QuoteGenerator/QuoteGenerator';

function App() {
  return (
    <div>
      <BrowserRouter >
        <div>
          <Header />
          <Route exact path="/" component={Home}/>
          <Route exact path="/quote-generator" component={QuoteGenerator}/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

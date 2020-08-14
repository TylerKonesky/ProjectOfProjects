import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import QuoteGenerator from './Components/QuoteGenerator/QuoteGenerator';
import Infinity from './Components/InfinityScroll/Infinity';

function App() {
  
  return (
    <div>
      <BrowserRouter >
        <div>
          <Header />
          <Route exact path="/" component={Home}/>
          <Route exact path="/quote-generator" component={QuoteGenerator}/>
          <Route exact path="/infinity" component={Infinity}/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

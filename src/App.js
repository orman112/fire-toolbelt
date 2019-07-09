import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import MainBanner from './components/main-banner/MainBanner';

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div className='jumbotron text-center'>
          <div className='container'>
            <Route path="/" render={() => <MainBanner />} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

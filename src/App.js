import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import MainBanner from './components/main-banner/MainBanner';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='jumbotron text-center'>
          <div className='container'>
            <Route exact path="/" render={() =>
              <div>
                <h1 className='jumbotron-heading'>Welcome to the Fire Toolbelt</h1>
                <p className="lead text-muted">
                  This application is meant to provide tools that help with personal finance.
                </p>

                <p className="lead text-muted">
                  Select from one of the links in the navigation above.
                </p>
              </div>
            } />
            <MainBanner />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

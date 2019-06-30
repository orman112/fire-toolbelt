import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import StockFinder from './components/StockFinder';

class App extends Component {
  render() {
    return (
      <div>

        <div>
          <nav className="navbar navbar-dark bg-dark">
            <ul className="nav navbar-nav">
              {/* <li><Link to="/">Home</Link></li> */}
              <li><Link className="navbar-brand" to="/find-stock">Find Stock</Link></li>
            </ul>
          </nav>
        </div>

        <h1>{this.props.greeting}</h1>
        <div>
          <Route path="/find-stock"
            render={() =>
              <StockFinder/>}
          />
        </div>
      </div >


      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to load.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
    );
  }
}

export default App;

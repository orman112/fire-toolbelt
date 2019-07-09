import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends Component {
    render() {
        return (
            <nav className="sidebar position-absolute bg-dark">
                <ul className="nav navbar-nav">
                    <li><Link className="navbar-brand" to="/">Home</Link></li>
                    <li><Link className="navbar-brand" to="/search-funds">Search Funds</Link></li>
                    <li><Link className="navbar-brand" to="/notes">Notes</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Sidebar;
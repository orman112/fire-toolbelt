import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="nav navbar-nav justify-content-center">
                    <li><Link className="navbar-brand" to="/">Home</Link></li>
                    <li><Link className="navbar-brand" to="/search-funds">Search Funds</Link></li>
                    <li><Link className="navbar-brand" to="/notebook">Notes</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Header;
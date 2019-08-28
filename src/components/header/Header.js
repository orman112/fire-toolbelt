import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { auth } from '../../firebase'
import { Consumer } from '../AppProvider'

const Header = props => {
    const handleLogout = context => {
        auth.logout();
        context.destroySession();
        props.history.push('/signedOut');
    };

    return <Consumer>
        {({ state, ...context }) => (
            state.currentUser ? 
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <ul className="nav navbar-nav mx-auto">
                        <li><Link className="navbar-brand" to="/dashboard">Dashboard</Link></li>
                        <li><a href="/" className="navbar-brand" onClick={() => handleLogout(context)}>Logout</a></li>
                        <li><Link className="navbar-brand" to="/search-funds">Search Funds</Link></li>
                        <li><Link className="navbar-brand" to="/notebook">Notes</Link></li>
                    </ul>
                </nav>
                :
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <ul className="nav navbar-nav mx-auto">
                        <li><Link className="navbar-brand" to="/">Home</Link></li>
                        <li><Link className="navbar-brand" to="/login">Login</Link></li>
                        <li><Link className="navbar-brand" to="/signup">Create Account</Link></li>
                        <li><Link className="navbar-brand" to="/search-funds">Search Funds</Link></li>
                        <li><Link className="navbar-brand" to="/notebook">Notes</Link></li>
                    </ul>
                </nav>
        )}
    </Consumer>
};

export default withRouter(Header);
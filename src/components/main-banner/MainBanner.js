import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class MainBanner extends Component {
    render() {
        return (
            <div>
                <h1 className='jumbotron-heading'>Welcome to Fire Tools</h1>
                <p className="lead text-muted">
                    Informational text goes here.
                </p>
                <p>
                    <Link className='btn btn-primary my-2' to='/find-stock'>Search For A Stock</Link>
                    <Link className='btn btn-secondary my-2' to='/find-index'>Search For An Index</Link>
                </p>
            </div>
        )
    }
}

export default MainBanner;
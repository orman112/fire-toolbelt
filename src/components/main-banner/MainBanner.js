import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import StockFinder from '../stock-finder/StockFinder';
import IndexFinder from '../index-finder/IndexFinder';
import Notebook from '../notebook/Notebook';

class MainBanner extends Component {
    render() {
        return (
            <div>
                <h1 className='jumbotron-heading'>Welcome to Fire Tools</h1>
                <p className="lead text-muted">
                    Informational text goes here.
                </p>
                <Route path="/search-funds" render={() =>
                    <div>
                        <div>
                            <p>
                                <Link className='btn btn-primary my-2' to='/find-stock'>Search For A Stock</Link>
                                <Link className='btn btn-secondary my-2' to='/find-index'>Search For An Index</Link>
                            </p>
                        </div>
                        <Route path="/find-stock" render={() => <StockFinder />} />
                        <Route path="/find-index" render={() => <IndexFinder />} />
                    </div>
                }>
                </Route>
                <Route path="/notes" render={() => <Notebook />}>

                </Route>
            </div>
        )
    }
}

export default MainBanner;
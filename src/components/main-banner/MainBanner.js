import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import StockFinder from '../stock-finder/StockFinder';
import IndexFinder from '../index-finder/IndexFinder';
import Notebook from '../notebook/Notebook';

class MainBanner extends Component {
    render() {
        return (
            <div>
                <Route path="/search-funds" render={() =>
                    <div>
                        <div>
                            <p className="lead text-muted">
                                Click one of the buttons below to begin searching for individual stocks, 
                                or an index that measures a section of the stock market.
                            </p>
                                <Link className='btn btn-primary my-2' to='/search-funds/find-stock'>Search For A Stock</Link>
                                <Link className='btn btn-secondary my-2' to='/search-funds/find-index'>Search For An Index</Link>
                        </div>

                        <Route path="/search-funds/find-stock" render={() => <StockFinder />} />
                        <Route path="/search-funds/find-index" render={() => <IndexFinder />} />
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
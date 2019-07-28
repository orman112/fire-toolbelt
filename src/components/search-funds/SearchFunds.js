import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import StockFinder from './StockFinder';
import IndexFinder from './IndexFinder';

class SearchFunds extends Component {
    //Container component for searching stocks and indexes
    render() {
      
        return (
            <div>
                <div>
                    <p className="lead text-muted">
                        Click one of the buttons below to begin searching for individual stocks
                        or an index that measures a section of the stock market.
                </p>
                    <Link className='btn btn-primary my-2' to='/search-funds/find-stock'>Search For A Stock</Link>
                    <Link className='btn btn-secondary my-2' to='/search-funds/find-index'>Search For An Index</Link>
                </div>

                <Route path="/search-funds/find-stock" render={() => <StockFinder />} />
                <Route path="/search-funds/find-index" render={() => <IndexFinder />} />
            </div>
        )
    }
}

export default SearchFunds;
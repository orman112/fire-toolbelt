import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import { Line, defaults } from 'react-chartjs-2'
import StockFinder from './StockFinder';
import IndexFinder from './IndexFinder';

defaults.global.maintainAspectRatio = false // Don't maintain w/h ratio globally

class SearchFunds extends Component {
    //Container component for searching stocks and indexes
    render() {
        const data = {
            labels: [
              '10/04/2018', '10/05/2018', 
              '10/06/2018', '10/07/2018', 
              '10/08/2018', '10/09/2018', 
              '10/10/2018', '10/11/2018', 
              '10/12/2018', '10/13/2018', 
              '10/14/2018', '10/15/2018'
            ],
            datasets: [
              {
                label: 'Temperature',
                data: [22,19,27,23,22,24,17,25,23,24,20,19],
                fill: false,          // Don't fill area under the line
                borderColor: 'green'  // Line color
              }
            ]
          }
      
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


                <article className="canvas-container">
                    <Line data={data} />
                </article>

                <Route path="/search-funds/find-stock" render={() => <StockFinder />} />
                <Route path="/search-funds/find-index" render={() => <IndexFinder />} />
            </div>
        )
    }
}

export default SearchFunds;
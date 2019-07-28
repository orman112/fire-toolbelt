import React, { Component } from 'react';
import { Line, defaults } from 'react-chartjs-2';

const url = 'https://financialmodelingprep.com/api/v3/historical-price-full/';
const timeSeries = 7; //gets last five days
defaults.global.maintainAspectRatio = false // Don't maintain w/h ratio globally

class StockFinder extends Component {
    //Stockfinder is used to search for individual stocks by their ticker symbol
    constructor() {
        super();
        this.state = {
            symbol: '',
            price: 0,
            history: [],
            labels: [],
            datasets: [
                {
                    label: '',
                    data: [],
                    fill: false,          // Don't fill area under the line
                    borderColor: 'green'  // Line color
                }
            ]
        }
    }

    async fetchStock(symbol) {
        let requestUrl = `${url}${symbol}?timeseries=${timeSeries}`;
        console.log(`Searching for information at ${requestUrl}`);
        let result = await fetch(requestUrl)
            .then(response => {
                return response.json()
                    .then((json) => {
                        return json;
                    });
            });


        console.log('result', result);    
        return result;
    }

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
                <form onSubmit={
                    (event) => {
                        //TODO: refactor and create method.
                        event.preventDefault()
                        this.fetchStock(this.state.symbol)
                            .then(response => {
                                if (response.Error) {
                                    console.log('Could not complete request. Resetting symbol');
                                    this.setState({ symbol: '', price: 0 });
                                    return;
                                }
                                this.setState({ 
                                    history: response.historical, 
                                    symbol: response.symbol, 
                                    price: response.historical[response.historical.length - 1].close 
                                });
                            })
                            .catch((error) => {
                                console.log('error response: ', error);
                                console.log(`Something went wrong trying to find information for ${this.state.symbol}, please try again.`)
                            });
                    }}>
                    <label>Name: </label>
                    <input type='text' id='name' value={this.state.symbol} onChange={(event) => {
                        //TODO: dont update on change, only on submit
                        this.setState({ symbol: event.target.value })
                    }} />
                    <input type='submit' />
                </form>
                <h2>Stock Symbol: {this.state.symbol}</h2>
                <h2>Stock Price: {this.state.price}</h2>

                <article className="canvas-container">
                    <Line data={data} />
                </article>
            </div>
        )
    }
}

export default StockFinder;
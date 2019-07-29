import React, { Component } from 'react';
import { Line, defaults } from 'react-chartjs-2';
import Carousel from '../../utils/Carousel';

const baseUrl = 'https://financialmodelingprep.com/api/v3';
const historicalUrl = '/historical-price-full/';
const activeUrl = '/stock/actives';
const timeSeries = 25;
defaults.global.maintainAspectRatio = false // Don't maintain w/h ratio globally

class StockFinder extends Component {
    //Stockfinder is used to search for individual stocks by their ticker symbol
    constructor() {
        super();
        this.state = {
            symbol: '',
            price: 0,
            labels: [],
            data: [],
            stocksCarousel: []
        }
    }

    componentDidMount() {
        this.getActiveStocks();
    }

    async getActiveStocks() {
        let requestUrl = `${baseUrl}${activeUrl}`;
        let result = await fetch(requestUrl)
            .then(response => {
                return response.json()
                    .then((json) => {
                        let carouselItems = json.mostActiveStock.map(stock => {
                            return {
                                header: stock.ticker,
                                title: stock.companyName,
                                text: stock.price
                            }
                        });
                        this.setState({ stocksCarousel: carouselItems });
                        console.log('active stocks: ', carouselItems);
                        return json;
                    });
            });

        return result;
    }

    async fetchStock(symbol) {
        let requestUrl = `${baseUrl}${historicalUrl}${symbol}?timeseries=${timeSeries}`;
        let result = await fetch(requestUrl)
            .then(response => {
                return response.json();
            });

        return result;
    }

    handleFormSubmit = (event) => {
        //TODO: refactor and create method.
        event.preventDefault();
        const dataValues = [];
        const labelValues = [];
        this.fetchStock(this.state.symbol)
            .then(response => {
                if (response.Error) {
                    console.log('Could not complete request. Resetting symbol');
                    this.setState({ symbol: '', price: 0 });
                    return;
                }
                response.historical.forEach(record => {
                    dataValues.push(record.close);
                    labelValues.push(this.formatDate(record.date));
                })
                this.setState({ 
                    symbol: response.symbol, 
                    price: response.historical[response.historical.length - 1].close,
                    labels: labelValues,
                    data: dataValues
                });
            })
            .catch((error) => {
                console.log('error response: ', error);
                console.log(`Something went wrong trying to find information for ${this.state.symbol}, please try again.`)
            });
    }

    formatDate(date) {
        var dateToFormat = new Date(date);
        return `${dateToFormat.getDay()}/${dateToFormat.getMonth()}/${dateToFormat.getFullYear()}`
    }

    render() {
        const data = {
            labels: this.state.labels, 
            datasets: [
              {
                label: 'Closing Price',
                data: this.state.data,
                fill: false,          // Don't fill area under the line
                borderColor: 'green'  // Line color
              }
            ]
          }

        return (
            <div>
                <p className="lead text-muted">
                    Search for an individual stock by including the ticker below, 
                    or choose one of the following active stocks.
                </p>
                <Carousel 
                    groups={2} 
                    collection={this.state.stocksCarousel}
                />
                <form onSubmit={(event) => this.handleFormSubmit(event)}>
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
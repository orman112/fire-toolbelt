import React, { Component } from 'react';
import { Line, defaults } from 'react-chartjs-2';
import CarouselUtil from '../../utils/carousel/CarouselUtil';

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
                                key: stock.ticker,
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

    async fetchStockHistory(symbol) {
        const requestUrl = `${baseUrl}${historicalUrl}${symbol}?timeseries=${timeSeries}`;
        const dataValues = [];
        const labelValues = [];

        let result = await fetch(requestUrl)
            .then(response => {
                return response.json()
                    .then((json) => {
                        json.historical.forEach(record => {
                            dataValues.push(record.close);
                            labelValues.push(this.formatDate(record.date));
                        });

                        this.setState({ 
                            symbol: json.symbol, 
                            price: json.historical[json.historical.length - 1].close,
                            labels: labelValues,
                            data: dataValues
                        });
                    });
            });

        return result;
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.fetchStockHistory(this.state.symbol)
            .catch((error) => {
                console.log(`Something went wrong trying to find information for ${this.state.symbol}.`, error);
                this.setState({ symbol: '', price: 0 });
            });
    }

    formatDate(date) {
        var dateToFormat = new Date(date);
        return `${dateToFormat.getDay()}/${dateToFormat.getMonth()}/${dateToFormat.getFullYear()}`
    }

    handleCarouselClick = (item) => {
        console.log('Carousel was clicked! ', item.key);
        this.fetchStockHistory(item.key);
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
                <form className='form-inline justify-content-center' onSubmit={(event) => this.handleFormSubmit(event)}>
                    <input type='text' id='name' placeholder='Symbol' className='form-control mr-sm-2' value={this.state.symbol} onChange={(event) => {
                        //TODO: dont update on change, only on submit
                        this.setState({ symbol: event.target.value.toUpperCase() })
                    }} />
                    <button type='submit' className='btn btn-primary'>Search</button>
                </form>
                <h2>Stock Symbol: {this.state.symbol}</h2>
                <h2>Stock Price: {this.state.price}</h2>

                <article className="canvas-container">
                    <Line data={data} />
                </article>
                
                <CarouselUtil 
                    groups={2} 
                    collection={this.state.stocksCarousel}
                    onClickCallBack={this.handleCarouselClick}
                />
            </div>
        )
    }
}

export default StockFinder;
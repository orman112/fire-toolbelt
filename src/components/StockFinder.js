import React, { Component } from 'react'

const url = 'https://financialmodelingprep.com/api/v3/stock/real-time-price/'

class StockFinder extends Component {
    constructor() {
        super();
        this.state = {
            symbol: '',
            price: 0
        }
    }

    async fetchStock(symbol) {
        let requestUrl = `${url}${symbol}`;
        console.log(`Searching for information at ${requestUrl}`);
        let result = await fetch(requestUrl).then(response => response.json());
        
        return result;
    }

    render() {
        return (
            <div className='jumbotron'>
                <div className='container'>
                    <form onSubmit={
                        (event) => {
                            event.preventDefault()
                            this.fetchStock(this.state.symbol)
                                            .then(response => {
                                                if (response.Error) {
                                                    console.log(`Something went wrong trying to find information for ${this.state.symbol}, please try again.`)
                                                    this.setState({symbol: '', price: 0});
                                                    return;
                                                }
                                                this.setState({symbol: response.symbol, price: response.price});
                                            })
                                            .catch(() => {
                                                console.log(`Something went wrong trying to find information for ${this.state.symbol}, please try again.`)
                                            });
                            //this.setState({ symbol: '', price: '' });
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

                </div>
            </div>
        )
    }
}

export default StockFinder;
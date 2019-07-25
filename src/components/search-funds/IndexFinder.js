import React, { Component } from 'react'

const url = 'https://financialmodelingprep.com/api/v3/majors-indexes/'

class IndexFinder extends Component {
    //Make sure to include the correct ticker for index you are looking for
    //A common 'gotcha' is not including the period prefix
    constructor() {
        super();
        this.state = {
            ticker: '',
            price: 0,
            name: '',
            changes: 0
        }
    }

    async fetchStock(ticker) {
        let requestUrl = `${url}${ticker}`;
        console.log(`Searching for information at ${requestUrl}`);
        let result = await fetch(requestUrl).then(response => response.json());

        return result;
    }

    render() {
        return (
            <div>
                <form onSubmit={
                    (event) => {
                        event.preventDefault()
                        this.fetchStock(this.state.ticker)
                            .then(response => {
                                if (response.Error) {
                                    console.log(`Something went wrong trying to find information for ${this.state.ticker}, please try again.`)
                                    this.setState({ ticker: '', price: 0 });
                                    return;
                                }
                                this.setState({ 
                                    ticker: response.ticker, 
                                    price: response.price,
                                    name: response.indexName,
                                    change: response.changes
                                });
                            })
                            .catch(() => {
                                console.log(`Something went wrong trying to find information for ${this.state.ticker}, please try again.`)
                            });
                    }}>
                    <label>Name: </label>
                    <input type='text' id='name' value={this.state.ticker} onChange={(event) => {
                        //TODO: dont update on change, only on submit
                        this.setState({ ticker: event.target.value })
                    }} />
                    <input type='submit' />
                </form>
                <h2>Index ticker: {this.state.ticker}</h2>
                <h2>Index Name: {this.state.name}</h2>
                <h2>Price: {this.state.price}</h2>
                <h2>Change: {this.state.change}</h2>
            </div>
        )
    }
}

export default IndexFinder;
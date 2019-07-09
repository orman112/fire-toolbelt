import React, { Component } from 'react'

const requestUrl = 'a.wunderlist.com/api/v1/notes';
const accessToken = '14e0788e94f7cb3675aa3a07f108e3bf1a294bbd7cfce5098a7cd27e4c99';
const clientId = '49109e3652c82c86cc54';

class Notebook extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    async fetchNotes() {
        let headers = new Headers({
            'X-Access-Token': accessToken,
            'X-Client-ID': clientId
        });
        console.log(`Searching for notes from ${requestUrl}`);
        let result = await fetch(requestUrl, headers)
            .then(response => response.json());

        return result;
    }

    render() {
        return (
            <div>
                <form onSubmit={
                    (event) => {
                        event.preventDefault()
                        this.fetchStock(this.state.symbol)
                            .then(response => {
                                if (response.Error) {
                                    console.log(`Something went wrong trying to find information for ${this.state.symbol}, please try again.`)
                                    this.setState({ symbol: '', price: 0 });
                                    return;
                                }
                                this.setState({ symbol: response.symbol, price: response.price });
                            })
                            .catch(() => {
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
            </div>
        )
    }
}

export default StockFinder;
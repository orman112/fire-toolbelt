import React, { Component } from 'react'

class StockFinder extends Component {
    constructor() {
        super();
        this.state = {
            symbol: '',
            price: 0
        }
    }

    render() {
        return (
            <div class="jumbotron">
                <div class="container">
                    <form onSubmit={
                        (event) => {
                            event.preventDefault()

                            this.setState({ nameInput: '', ageInput: '' })
                        }}>
                        <label>Name: </label>
                        <input type='text' id='name' value={this.state.symbol} onChange={(event) => {
                            this.setState({ symbol: event.target.value })
                        }} />
                        <input type='submit' />
                    </form>
                    <h2>Stock Symbol: {this.state.symbol}</h2>

                </div>
            </div>
        )
    }
}

export default StockFinder;
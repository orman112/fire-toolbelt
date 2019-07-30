import React, { Component } from 'react';
import CarouselUtil from '../../utils/carousel/CarouselUtil';

const baseUrl = 'https://financialmodelingprep.com/api/v3/majors-indexes/'

class IndexFinder extends Component {
    //Make sure to include the correct ticker for index you are looking for
    //A common 'gotcha' is not including the period prefix
    constructor() {
        super();
        this.state = {
            ticker: '',
            price: 0,
            name: '',
            changes: 0,
            labels: [],
            data: [],
            indexCarousel: []
        }
    }

    componentDidMount() {
        this.fetchMajorIndexes();
    }

    async fetchMajorIndexes() {
        let result = await fetch(baseUrl)
            .then((response) => {
                return response.json()
                    .then(json => {
                        let carouselItems = 
                            json.majorIndexesList
                                .slice(0, 15)
                                .map((index) => {
                                    return {
                                        key: index.ticker,
                                        header: index.ticker,
                                        title: index.indexName,
                                        text: index.price
                                    }
                                });

                        this.setState({ indexCarousel: carouselItems });
                        return json;
                    });
            });

        return result;
    }

    async fetchIndex(ticker) {
        let requestUrl = `${baseUrl}${ticker}`;
        console.log(requestUrl);
        let result = await fetch(requestUrl)
            .then(response => {
                return response.json()
                    .then((json) => {                             
                        this.setState({ 
                            ticker: json.ticker, 
                            price: json.price,
                            name: json.indexName,
                            change: json.changes
                        });
                    });
            });

        return result;
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.fetchIndex(this.state.ticker)
            .catch((error) => {
                console.log(`Something went wrong trying to find information for ${this.state.ticker}.`, error)
            });
    }

    handleCarouselClick = (item) => {
        console.log(item);
        this.fetchIndex(item.key);
    }

    render() {
        return (
            <div>
                <p className="lead text-muted">
                    Search for an individual index by including the ticker below, 
                    or choose one of the following major indexes.
                </p>
                <form className='form-inline justify-content-center my-3' onSubmit={ (event) => this.handleFormSubmit(event) }>
                    <input type='text' id='name' placeholder='Symbol' className='form-control mr-sm-2' value={this.state.ticker} onChange={(event) => {
                        //TODO: dont update on change, only on submit
                        this.setState({ ticker: event.target.value })
                    }} />
                    <button type='submit' className='btn btn-primary'>Search</button>
                </form>
                
                <div className='my-3'>
                    <h2 className='lead text-muted'>Index ticker: <strong>{this.state.ticker}</strong></h2>
                    <h2 className='lead text-muted'>Index Name: <strong>{this.state.name}</strong></h2>
                    <h2 className='lead text-muted'>Price: <strong>{this.state.price}</strong></h2>
                    <h2 className='lead text-muted'>Change: <strong>{this.state.change}</strong></h2>
                </div>

                <CarouselUtil 
                    groups={3} 
                    collection={this.state.indexCarousel}
                    onClickCallBack={this.handleCarouselClick}
                />

            </div>
        )
    }
}

export default IndexFinder;
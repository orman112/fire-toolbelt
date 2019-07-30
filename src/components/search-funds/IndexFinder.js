import React, { Component } from 'react';

const baseUrl = 'https://financialmodelingprep.com/api/v3/majors-indexes/'

class IndexFinder extends Component {
    //Make sure to include the correct ticker for index you are looking for
    //A common 'gotcha' is not including the period prefix
    constructor() {
        super();
        this.state = {
            indexes: []
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
                        console.log(json.majorIndexesList);
                        this.setState({ indexes: json.majorIndexesList })
                        return json;
                    });
            });

        return result;
    }

    render() {
        return (
            <div>
                <table className="table text-left table-hover table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.indexes.map((index, key) =>
                                <tr key={index.ticker}>
                                    <th scope="row">{index.indexName}</th>
                                    <td>{index.price}</td>
                                    <td className={`${index.changes > 0 ? 'text-success' : 'text-danger'}`} >{index.changes}</td>
                                </tr>

                            )
                        }
                    </tbody>
                </table>


                {/* <p className="lead text-muted">
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
                </div> */}
            </div>
        )
    }
}

export default IndexFinder;
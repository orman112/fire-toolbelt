import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

const listsApi = 'https://a.wunderlist.com/api/v1/lists';
const accessToken = 'b46635f8b568e405865171dbf319d5964145ad77f47a4d479e2c6888099e';
const clientId = '49109e3652c82c86cc54';

class Notebook extends Component {
    constructor() {
        super();
        this.state = {
            lists: [],
            listTitle: ''
        };
    }

    async callWunderlistApi(requestUrl, options) {
        let result = await fetch(requestUrl, options)
            .then(response => response.json());

        return result;
    }

    getRequestOptions(method) {
        let options = {
            method: method,
            headers: new Headers({
                'Content-Type': 'application/json',
                'X-Access-Token': accessToken,
                'X-Client-ID': clientId
            })
        };

        return options;
    }

    async fetchLists() {
        let options = this.getRequestOptions('GET');

        console.log(`Fetching lists`);
        this.callWunderlistApi(listsApi, options)
            .then(response => {
                this.setState({lists: response});
                console.log(this.state.lists);
            });
    }

    async createList(title) {
        let options = this.getRequestOptions('POST');
        options.body = JSON.stringify({title: title});

        console.log(`Creating list titled ${title}`);
        this.callWunderlistApi(listsApi, options)
    }

    async deleteList(id) {
        let options = this.getRequestOptions('DELETE');

        console.log(`Deleting list ${id}`);
        this.callWunderlistApi(`${listsApi}/${id}`, options);
    }

    logMessage(id) {
        console.log(id);
    }

    componentWillMount() {
        this.fetchLists();
    }

    render() {
        return (
            <div>
                <form onSubmit={
                    (event) => {
                        event.preventDefault()
                        this.createList(this.state.listTitle)
                            .then(() => {
                                this.fetchLists();
                            })
                            .catch(() => {
                                console.log(`Something went wrong while trying to create a list.`);
                            });
                    }}>
                    <label>Name: </label>
                    <input type='text' id='name' value={this.state.listTitle} onChange={(event) => {
                        this.setState({ listTitle: event.target.value })
                    }} />
                    <input type='submit' />
                </form>

                <div className='row'>
                    {this.state.lists.map((list, key) =>
                        <div key={ list.title } className='col-sm-4 float-left mt-4'>
                            <div className='card'>
                                <div className='card-body'>
                                    <span onClick={this.logMessage.bind(this, list.id)}>
                                        <FontAwesomeIcon icon={ faWindowClose } className='close' />
                                    </span>
                                    <h5 className='card-title'>{ list.title }</h5>
                                    <p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>                
            </div>
        )
    }
}

export default Notebook;
import React, { Component } from 'react'
import Lists from './Lists.js';

//TODO: Generate new token and remove these from source control
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

    componentDidMount() {
        this.fetchLists();
    }

    async callWunderlistApi(requestUrl, options) {
        let result = await fetch(requestUrl, options)
            .then(response => {
                return response.text()
                    .then((data) => {
                        return data ? JSON.parse(data) : {};
                    });
            });

        console.log('result: ', result);
        return result;
    }

    getRequestOptions(method) {
        let options = {
            method: method,
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token': accessToken,
                'X-Client-ID': clientId
            })
        };

        return options;
    }

    async fetchLists() {
        let options = this.getRequestOptions('GET');

        console.log(`Fetching all lists`);
        this.callWunderlistApi(listsApi, options)
            .then(response => {
                console.log('response: ', response);
                this.setState({ lists: response });
            });
    }

    async createList(title) {
        let options = this.getRequestOptions('POST');
        options.body = JSON.stringify({ title: title });

        console.log(`Creating list titled ${title}`);
        this.callWunderlistApi(listsApi, options)
            .then(() => {
                this.fetchLists();
            })
            .catch(() => {
                console.log(`Something went wrong while trying to create a list.`);
            });
    }

    async deleteList(id, revision) {
        let options = this.getRequestOptions('DELETE');

        console.log(`Deleting list ${id}`);
        this.callWunderlistApi(`${listsApi}/${id}?revision=${revision}`, options)
            .then(() => {
                this.fetchLists();
            })
            .catch(() => {
                console.log(`Something went wrong trying to delete list ${id}.`);
            });
    }

    render() {
        return (
            <div>
                <Lists 
                    deleteList={this.deleteList.bind(this)} 
                    createList={this.createList.bind(this)}
                    lists={this.state.lists}
                    listTitle={this.state.listTitle} />                
            </div>
        )
    }
}

export default Notebook;
import React, { Component } from 'react'
import Notebooks from './Notebooks';

//TODO: Generate new token and remove these from source control
const accessToken = 'b46635f8b568e405865171dbf319d5964145ad77f47a4d479e2c6888099e';
const clientId = '49109e3652c82c86cc54';

class WunderlistApiHelper extends Component {
    async callWunderlistApi(requestUrl, options) {
        let result = await fetch(requestUrl, options)
            .then(response => {
                return response.text()
                    .then((data) => {
                        return data ? JSON.parse(data) : {};
                    });
            });

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

    render() {
        return (
            <div>
                <Notebooks 
                    callWunderlistApi={this.callWunderlistApi.bind(this)}
                    getRequestOptions={this.getRequestOptions.bind(this)} 
                />                
            </div>
        )
    }
}

export default WunderlistApiHelper;
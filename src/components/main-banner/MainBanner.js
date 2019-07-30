import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import WunderlistApiHelper from '../notebook/WunderlistApiHelper';
import SearchFunds from '../search-funds/SearchFunds';

class MainBanner extends Component {
    render() {
        return (
            <div>
                <Route path="/search-funds" render={() => <SearchFunds />} />
                <Route path="/notebook" render={() => <WunderlistApiHelper />} />
            </div>
        )
    }
}

export default MainBanner;
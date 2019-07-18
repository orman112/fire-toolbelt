import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Notebook from '../notebook/Notebook';
import SearchFunds from '../search-funds/SearchFunds';

class MainBanner extends Component {
    render() {
        return (
            <div>
                <Route path="/search-funds" render={() => < SearchFunds />} />
                <Route path="/notebook" render={() => <Notebook />} />
            </div>
        )
    }
}

export default MainBanner;
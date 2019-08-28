import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Consumer } from './AppProvider'

class Authenticated extends Component {
    render() {
        return (
            <Consumer>
                {
                    ({ state }) => state.currentUser ?
                        <div>
                            <h1 className='content'>Thanks for logging in!</h1>
                            <p>
                                {this.props.children}
                            </p>
                        </div>
                         :
                        <Redirect to='/' />
                        /* <div className='content'>
                                <h1>Access denied.</h1>
                                <p>You are not authorized to access this page.</p>
                            </div> */
                }
            </Consumer>
        )
    }
}

export default Authenticated;
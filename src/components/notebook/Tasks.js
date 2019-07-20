import React, { Component } from 'react';

class Tasks extends Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount(){
        console.log('id: ', this.props.match.params.id);

    }

    render() {
        return (
            <div>
                <h2>Test</h2>
                <h3>ID: {this.props.match.params.id}</h3>
            </div>
        )
    }
}

export default Tasks;
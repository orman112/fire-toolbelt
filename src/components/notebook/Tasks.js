import React, { Component } from 'react';

const tasksApi = 'https://a.wunderlist.com/api/v1/tasks';

class Tasks extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            tasks: [],
            taskTitle: ''
        };
    }

    componentDidMount() {
        const listId = this.props.match.params.id;
        console.log('list id: ', listId);
        this.fetchTasks(listId);
    }

    async fetchTasks(listId) {
        let options = this.props.getRequestOptions('GET');

        console.log(`Fetching all tasks for list`);
        this.props.callWunderlistApi(`${tasksApi}?list_id=${listId}`, options)
            .then(response => {
                console.log('tasks: ', response);
                this.setState({ tasks: response });
            });
    }

    // async createList(title) {
    //     let options = this.props.getRequestOptions('POST');
    //     options.body = JSON.stringify({ title: title });

    //     console.log(`Creating list titled ${title}`);
    //     this.props.callWunderlistApi(tasksApi, options)
    //         .then(() => {
    //             this.fetchTasks();
    //         })
    //         .catch(() => {
    //             console.log(`Something went wrong while trying to create a list.`);
    //         });
    // }

    // async deleteList(id, revision) {
    //     let options = this.props.getRequestOptions('DELETE');

    //     console.log(`Deleting list ${id}`);
    //     this.props.callWunderlistApi(`${tasksApi}/${id}?revision=${revision}`, options)
    //         .then(() => {
    //             this.fetchTasks();
    //         })
    //         .catch(() => {
    //             console.log(`Something went wrong trying to delete list ${id}.`);
    //         });
    // }

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
import React, { Component } from 'react';
import './Tasks.scss';
import Notes from './Notes';

const tasksApi = 'https://a.wunderlist.com/api/v1/tasks';

class Tasks extends Component {
    //The Tasks component is really just needed to provide a title for the notes
    //for some reason, the Wunderlist API doesn't allow notes associated to Lists (even though their docs say they do)
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            taskTitle: '',
            tasksAreEmpty: false,
            loading: true,
            parentListId: parseInt(this.props.match.params.id)
        };
    }

    componentDidMount() {
        console.log('list id: ', this.state.parentListId);
        this.fetchTasks();
    }

    async fetchTasks() {
        let listId = this.state.parentListId;
        let options = this.props.getRequestOptions('GET');

        console.log(`Fetching all tasks for list ${this.state.parentListId}`);
        return this.props.callWunderlistApi(`${tasksApi}?list_id=${listId}`, options)
            .then(response => {
                console.log('tasks: ', response);
                this.setState({ tasks: response, tasksAreEmpty: response.length === 0 });
            });
    }

    async createTask(title) {
        let options = this.props.getRequestOptions('POST');
        options.body = JSON.stringify({ list_id: parseInt(this.state.parentListId), title: title });

        console.log(`Creating task titled ${title}`);
        this.props.callWunderlistApi(tasksApi, options)
            .then(() => {
                this.fetchTasks();
            })
            .catch(() => {
                console.log(`Something went wrong while trying to create a task.`);
            });
    }

    async deleteTask(id, revision) {
        let options = this.props.getRequestOptions('DELETE');

        console.log(`Deleting task ${id}`);
        this.props.callWunderlistApi(`${tasksApi}/${id}?revision=${revision}`, options)
            .then(() => {
                this.fetchTasks();
            })
            .catch(() => {
                console.log(`Something went wrong trying to delete task ${id}.`);
            });
    }

    render() {
        return (
            <div>
                <p className="lead text-muted">
                    Create a new note below by giving it a title.
                </p>
                <form className='form-inline justify-content-center' onSubmit={
                    (event) => {
                        event.preventDefault()
                        this.state.taskTitle ?
                            this.createTask(this.state.taskTitle) :
                            console.log('Task title was empty. Could not create a new task.');
                    }}>
                    <input type='text' id='name' placeholder='Title' className='form-control mr-sm-2'
                        value={this.state.taskTitle} onChange={(event) => {
                            this.setState({ taskTitle: event.target.value })
                        }} />
                    <button type='submit' className='btn btn-primary'>Create</button>
                </form>
                <div class='row mt-4'>
                    {
                        this.state.tasks.map((task) =>
                            <div key={task.title} className='notebook-page col-5'>
                                <Notes task={task} deleteTask={this.deleteTask.bind(this)} />
                            </div>
                        )
                    }
                    {
                        this.state.tasksAreEmpty &&
                        <div className='ml-auto mr-auto'>
                            <h2>You have not created any notes yet.</h2>
                            <h3>Create one above and don't forget to give it a title!</h3>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Tasks;
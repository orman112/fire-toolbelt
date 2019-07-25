import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Notebooks.scss'
import Tasks from './Tasks';

const listsApi = 'https://a.wunderlist.com/api/v1/lists';

class Notebooks extends Component {
    //The Notebook component is the container for the rest of the Wunderlist API components
    constructor(props) {
        super(props);

        this.state = {
            notebooks: [],
            notebookTitle: ''
        };
    }

    componentDidMount() {
        this.fetchNotebooks();
    }

    async fetchNotebooks() {
        let options = this.props.getRequestOptions('GET');

        console.log(`Fetching all notebooks`);
        this.props.callWunderlistApi(listsApi, options)
            .then(response => {
                console.log('notebooks: ', response);
                this.setState({ notebooks: response });
            });
    }

    async createNotebook(title) {
        let options = this.props.getRequestOptions('POST');
        options.body = JSON.stringify({ title: title });

        console.log(`Creating notebook titled ${title}`);
        this.props.callWunderlistApi(listsApi, options)
            .then(() => {
                this.fetchNotebooks();
            })
            .catch(() => {
                console.log(`Something went wrong while trying to create a notebook.`);
            });
    }

    async deleteNotebook(id, revision) {
        let options = this.props.getRequestOptions('DELETE');

        console.log(`Deleting notebook ${id}`);
        this.props.callWunderlistApi(`${listsApi}/${id}?revision=${revision}`, options)
            .then(() => {
                this.fetchNotebooks();
            })
            .catch(() => {
                console.log(`Something went wrong trying to delete notebook ${id}.`);
            });
    }

    formatDate(date) {
        var dateToFormat = new Date(date);
        return `${dateToFormat.getDay()}/${dateToFormat.getMonth()}/${dateToFormat.getFullYear()}`
    }

    render() {
        return (
            <div>
                <Route exact path='/notebook' render={() =>
                    <div>
                        <p className="lead text-white">
                            Create a new notebook by giving it a title.
                        </p>
                        <form className='form-inline justify-content-center' onSubmit={
                            (event) => {
                                event.preventDefault()
                                this.state.notebookTitle ?
                                    this.createNotebook(this.state.notebookTitle) :
                                    console.log('Notebook title was empty. Could not create a new notebook.');
                            }}>
                            <input type='text' id='name' placeholder='Title' className='form-control mr-sm-2'
                                value={this.state.notebookTitle} onChange={(event) => {
                                    this.setState({ notebookTitle: event.target.value })
                                }} />
                            <button type='submit' className='btn btn-primary'>Create</button>
                        </form>

                        <div className='row'>
                            {this.state.notebooks.map((notebook, key) =>
                                <Link to={`/notebook/${notebook.id}/tasks`} key={notebook.title} className='notebook mt-3 text-decoration-none'>
                                    <div className="ribbon"></div>
                                    <div className="wrapper">
                                        <h1 className='title text-white'>{notebook.title}</h1>
                                    </div>
                                    <span onClick={(e) => {
                                        e.preventDefault();
                                        this.deleteNotebook(notebook.id, notebook.revision);
                                    }}>
                                        <FontAwesomeIcon icon={faTrashAlt} className='close' />
                                    </span>
                                    <div className='created-date'>
                                        <small>Created: {this.formatDate(notebook.created_at)}</small>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                } />

                <Route exact path='/notebook/:id/tasks' render={(routeProps) =>
                    <Tasks {...routeProps} {...this.props} />}
                />
            </div>
        );
    }
}

export default Notebooks;
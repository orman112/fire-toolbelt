import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Tasks from './Tasks';

const listsApi = 'https://a.wunderlist.com/api/v1/lists';

class Lists extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            lists: [],
            listTitle: ''
        };
    }

    componentDidMount() {
        this.fetchLists();
    }

    async fetchLists() {
        let options = this.props.getRequestOptions('GET');

        console.log(`Fetching all lists`);
        this.props.callWunderlistApi(listsApi, options)
            .then(response => {
                console.log('lists: ', response);
                this.setState({ lists: response });
            });
    }

    async createList(title) {
        let options = this.props.getRequestOptions('POST');
        options.body = JSON.stringify({ title: title });

        console.log(`Creating list titled ${title}`);
        this.props.callWunderlistApi(listsApi, options)
            .then(() => {
                this.fetchLists();
            })
            .catch(() => {
                console.log(`Something went wrong while trying to create a list.`);
            });
    }

    async deleteList(id, revision) {
        let options = this.props.getRequestOptions('DELETE');

        console.log(`Deleting list ${id}`);
        this.props.callWunderlistApi(`${listsApi}/${id}?revision=${revision}`, options)
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
                <Route exact path='/notebook' render={() =>
                    <div>
                        <p className="lead text-muted">
                            Create a list below by giving it a title.
                        </p>
                        <form className='form-inline justify-content-center' onSubmit={
                            (event) => {
                                event.preventDefault()
                                this.state.listTitle ?
                                    this.createList(this.state.listTitle) :
                                    console.log('List title was empty. Could not create a new list.');
                            }}>
                            <input type='text' id='name' placeholder='Title' className='form-control mr-sm-2'
                                value={this.state.listTitle} onChange={(event) => {
                                    this.setState({ listTitle: event.target.value })
                                }} />
                            <button type='submit' className='btn btn-primary'>Create</button>
                        </form>

                        <div className='row'>
                            {this.state.lists.map((list, key) =>
                                <div key={list.title} className='col-sm-4 float-left mt-4'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <span onClick={(e) => this.deleteList(list.id, list.revision)}>
                                                <FontAwesomeIcon icon={faWindowClose} className='close' />
                                            </span>
                                            <Link to={`/notebook/${list.id}/tasks`} >
                                                <h5 className='card-title'>{list.title}</h5>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
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

export default Lists;
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Tasks from './Tasks';

class Lists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listTitle: this.props.listTitle
        }
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
                                    this.props.createList(this.state.listTitle) :
                                    console.log('List title was empty. Could not create a new list.');
                            }}>
                            <input type='text' id='name' placeholder='Title' className='form-control mr-sm-2'
                                value={this.state.listTitle} onChange={(event) => {
                                    this.setState({ listTitle: event.target.value })
                                }} />
                            <button type='submit' className='btn btn-primary'>Create</button>
                        </form>

                        <div className='row'>
                            {this.props.lists.map((list, key) =>
                                <div key={list.title} className='col-sm-4 float-left mt-4'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <span onClick={(e) => this.props.deleteList(list.id, list.revision)}>
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

                <Route exact path='/notebook/:id/tasks' component={Tasks} />
            </div>
        );
    }
}

export default Lists;
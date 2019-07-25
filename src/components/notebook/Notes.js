import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

class Notes extends Component {
    //The Notes component allows the user to jot down notes that pertain to that particular Notebook

    render() {
        return (
            <span>
                <span onClick={(e) => this.props.deleteTask(this.props.task.id, this.props.task.revision)}>
                    <FontAwesomeIcon icon={faWindowClose} className='close' />
                </span>
                <h1 className='title text-muted'>{this.props.task.title}</h1>
                <textarea id="page" cols="30" rows="10" placeholder="well...start note taking"></textarea>
            </span>
        )
    }
}

export default Notes;
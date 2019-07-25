import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

class Notes extends Component {
    render() {
        return (
            <span>
                <span onClick={(e) => this.deleteTask(this.props.task.id, this.props.task.revision)}>
                    <FontAwesomeIcon icon={faWindowClose} className='close' />
                </span>
                <h1 className='title text-muted'>{this.props.task.title}</h1>
                <textarea id="page" cols="30" rows="10" placeholder="well...start note taking"></textarea>
            </span>
        )
    }
}

export default Notes;
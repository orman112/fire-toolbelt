import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

class Notes extends Component {
    //The Notes component allows the user to jot down notes that pertain to that particular Notebook
    constructor(props) {
        super(props);
        this.state = {
            showButton: false
        }
    }

    handleSubmit(id, event) {
        event.preventDefault();
        console.log(`Note ${id} saved!`);
        //TODO: call wunderlist api to save note.
        this.setState({ showButton: false });
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(this.props.task.id, event)} 
            onInput={() => this.setState({ showButton: true })}>
                <span>
                    <span onClick={() => this.props.deleteTask(this.props.task.id, this.props.task.revision)}>
                        <FontAwesomeIcon icon={faWindowClose} className='close' />
                    </span>
                    <h1 className='title text-muted'>{this.props.task.title}</h1>
                    <textarea id="page" cols="30" rows="10" placeholder="well...start note taking"></textarea>
                </span>
                {
                    this.state.showButton ?
                    <button type='submit' className='btn btn-primary'>Save</button>
                    : null
                }
            </form>
        )
    }
}

export default Notes;
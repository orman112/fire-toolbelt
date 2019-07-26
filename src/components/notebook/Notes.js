import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

const notesApi = 'https://a.wunderlist.com/api/v1/notes';

class Notes extends Component {
    //The Notes component allows the user to jot down notes that pertain to that particular Notebook
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            showButton: false
        }
    }

    componentDidMount() {
        this.fetchNotes();
    }

    async fetchNotes() {
        let listId = 398871490;
        let options = this.props.getRequestOptions('GET');
        const newState = {};

        console.log(`Fetching all notes for list ${this.state.parentListId}`);
        return this.props.callWunderlistApi(`${notesApi}?list_id=${listId}`, options)
            .then(response => {
                console.log('notes: ', response);
                this.setState({ notes: response });
                response.forEach(note => {
                    newState[note.task_id] = note.content;
                });

                this.setState(newState);
            });
    }

    // renderNote(taskId) {
    //     if (!this.state.notes.length > 0) return;

    //     let note = this.state.notes.find(note => note.task_id === taskId);

    //     console.log('note: ', note);
    //     return note ? 
    //         <textarea id="page" cols="30" rows="10" placeholder="well...start note taking" value={note.content} onChange={(e) => this.setState({ activeNote: e.target.value })}></textarea> :
    //         <textarea id="page" cols="30" rows="10" placeholder="well...start note taking" onChange={(e) => this.setState({ activeNote: e.target.value })}></textarea>;
    // }

    handleNoteChange = (taskId, e) => {
        this.setState({[taskId]: e.target.value});
    }

    createUpdateNote(taskId, event) {
        event.preventDefault();
        console.log(`Note with parent task ${taskId} saved!`);
        console.log(`current  state: `, this.state[event.target.name]);

        // let options = this.props.getRequestOptions('POST');
        // options.body = JSON.stringify({ task_id: parseInt(taskId), content: 'Test Note' });

        // console.log(`Creating note with content`);
        // this.props.callWunderlistApi(notesApi, options)
        //     .then(() => {
        //         this.fetchNotes();
        //     })
        //     .catch(() => {
        //         console.log(`Something went wrong while trying to create a note.`);
        //     });


        this.setState({ showButton: false });
    }

    render() {
        return (
            <form 
                onSubmit={(event) => this.createUpdateNote(this.props.task.id, event)} 
                onInput={() => this.setState({ showButton: true })}>
                <span>
                    <span onClick={() => this.props.deleteTask(this.props.task.id, this.props.task.revision)}>
                        <FontAwesomeIcon icon={faWindowClose} className='close' />
                    </span>
                    <h1 className='title text-muted'>
                        {this.props.task.title}
                    </h1>
                    <textarea id="page" cols="30" rows="10" placeholder="well...start note taking" 
                        value={this.state[this.props.task.id]} 
                        onChange={(event) => this.handleNoteChange(this.props.task.id, event)}>
                    </textarea>
                    {/* {this.renderNote(this.props.task.id)} */}
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
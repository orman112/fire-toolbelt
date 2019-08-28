import React from 'react'
import { Consumer } from './AppProvider'

const FlashMessage = () => 
    <Consumer>
        {({state, ...context}) => state.message && 
        <small className='flashMessage'>
            {state.message}
            <button type='button' onClick={() => context.clearMessage()}>Ok</button>
        </small>}
    </Consumer>;

export default FlashMessage;
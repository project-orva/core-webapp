import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

import Layout from 'containers/layout';

const RTCMessages = ({ messages }) => (
    <>
        {
            messages.map(message => (
                <>
                    {message}
                </>
            ))
        }
    </>
);

const enhance = compose(
    connect(
        ({ coreRTC: {messages}}) => ({messages}),
        {
            addMessage: (message) => ({
                type: 'ADD_MESSAGE',
                value: message
            }),
        }
    ),
    withState('messageInput', 'setMessageInput', ''),
    withHandlers({
        submitMessage: ({messageInput, setMessageInput, addMessage}) => (event) => {
            event.preventDefault();

            addMessage(messageInput);
            setMessageInput('');
        },
        updateMessageInput: ({ setMessageInput }) => ({ target: {value}}) => {
            setMessageInput(value);
        }
    })
);

const CoreRTC = enhance(({ messages }) => (
    <>
        Core Real-Time-Chat

        <div>
            <RTCMessages messages={messages}/>
            <input />
        </div>
    </>
));


export default Layout(CoreRTC);

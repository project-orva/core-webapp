import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

import Layout from 'containers/layout';
import Rtc from 'components/rtc';

const enhance = compose(
    connect(
        ({ coreRTC: {messages}, creds: {username}}) => ({messages, username}),
        {
            addMessage: (message, sender) => ({
                type: 'ADD_MESSAGE',
                value: { message, sender },
            }),
        }
    ),
    withState('messageInput', 'setMessageInput', ''),
    withHandlers({
        submitMessage: ({messageInput, setMessageInput, addMessage, username}) => (event) => {
            event.preventDefault();

            addMessage(messageInput, username);
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

        <div style={{ position: 'absolute', height: 500, width: 800}}>
            <Rtc messages={messages}/>
        </div>
    </>
));


export default Layout(CoreRTC);

import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';

import Layout from 'containers/layout';
import Rtc from 'components/rtc';
import { subscribeToRTC, publishToRTC } from 'api/websockets';

const enhance = compose(
    connect(
        ({ coreRTC: { messages }, creds: { userid } }) => ({ messages, userid }),
        {
            addMessage: (message, sender) => ({
                type: 'ADD_MESSAGE',
                value: { message, sender },
            }),
        }
    ),
    withProps(({ userid }) => ({
        chatName: `chat-${userid}_CHANGEDIS`
    })),
    withState('messageInput', 'setMessageInput', ''),
    withHandlers({
        submitMessage: ({ messageInput, setMessageInput, addMessage, userid }) => (event) => {
            if (event.charCode !== 13) {
                return;
            }

            publishToRTC({
                uid: 'test',
                did: 'CHANGEDIS',
                request: messageInput
            });

            addMessage(messageInput, userid);
            setMessageInput('');
        },
        updateMessageInput: ({ setMessageInput }) => ({ target: { value } }) => {
            setMessageInput(value);
        },
        addSocketMessage: ({ addMessage }) => (data) => {
            addMessage(data.message, 'orva');
        }
    }),
    lifecycle({
        componentDidMount() {
            subscribeToRTC({
                name: 'chat-test_CHANGEDIS',
                handler: this.props.addSocketMessage 
            });
        }
    }),
);

const CoreRTC = enhance(({ messageInput, messages, submitMessage, updateMessageInput }) => (
    <>
        Core Real-Time-Chat

        <div style={{
            position: 'absolute',
            height: 500,
            width: 800
        }}>
            <Rtc
                tempInput={messageInput}
                messages={messages}
                onKeyUp={submitMessage}
                onChange={updateMessageInput}
            />
        </div>
    </>
));


export default Layout(CoreRTC);

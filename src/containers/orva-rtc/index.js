import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';

import Layout from 'containers/layout';
import Rtc from 'components/rtc';

const enhance = compose(
    connect(
        ({ coreRTC: { messages }, creds: { userid, ssid } }) => ({ messages, ssid, userid }),
        {
            addMessage: (payload) => ({
                type: 'SOCK_RTC_MESSAGE',
                payload,
            }),
            establishRtcConnection: () => ({
                type: 'ESTABLISH_RTC_CONNECTION'
            }),
        }
    ),
    withProps(({ userid, ssid }) => ({
        chatName: `chat-${userid}_${ssid}`
    })),
    withState('messageInput', 'setMessageInput', ''),
    withHandlers({
        submitMessage: ({ messageInput, setMessageInput, addMessage, ssid, userid }) => (event) => {
            if (event.charCode !== 13) {
                return;
            }

            addMessage({
                request: messageInput,
                uid: userid,
                did: ssid,
            });

            setMessageInput('');
        },
        updateMessageInput: ({ setMessageInput }) => ({ target: { value } }) => {
            setMessageInput(value);
        },
    }),
    lifecycle({
        componentDidMount() {
            this.props.establishRtcConnection();
        }
    })
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

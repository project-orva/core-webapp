import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import { isEmpty } from 'lodash';

import Layout from 'containers/layout';
import Rtc from 'components/rtc';
import NetworkTrace from 'components/rtc/rtc-network-trace';
import TraceInfo from 'components/rtc/trace-information';

import './styles.css';

const enhance = compose(
    connect(
        ({ coreRTC: { messages, telemetry }, creds: { userid, ssid } }) => ({ messages, ssid, userid, telemetry}),
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
    withState('currentTrace', 'setCurrentTrace', {}),
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
        updateCurrentTrace: () => (tr) => {
            console.log(tr)
        }
    }),
    lifecycle({
        componentDidMount() {
            const { telemetry, setCurrentTrace, establishRtcConnection } = this.props;
            
            establishRtcConnection();
            if(telemetry.length > 0) {
                setCurrentTrace(telemetry[telemetry.length -1])
            }
        }
    }),
    withProps(({ telemetry }) => ({
        telemetry: telemetry.filter(t => !isEmpty(t))
    }))
);


const CoreRTC = enhance(({ updateCurrentTrace, currentTrace, messageInput, messages, submitMessage, updateMessageInput }) => (
    <div className="rtc-grid-container">
        <div className="rtc-grid-chat">
            <Rtc
                tempInput={messageInput}
                messages={messages}
                onKeyUp={submitMessage}
                onChange={updateMessageInput}
            />            
        </div>
        <div className="rtc-grid-trace-info">
            <TraceInfo />
        </div>
        <div className="rtc-grid-trace">
            <NetworkTrace onSelection={updateCurrentTrace} trace={currentTrace.trace}/>
        </div>
    </div>
));


export default Layout(CoreRTC);

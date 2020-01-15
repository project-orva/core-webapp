import React from 'react';

import Layout from 'containers/layout';

import { RtcMessenger, NetworkTrace, TraceInformation } from 'components/rtc';
import enhance from './enhance-rtc';

import './styles.css';

// todo: display time message is resolved.
const CoreRTC = enhance(({
    setServiceTrace,
    serviceTrace,
    latestTrace,
    messageInput,
    messages,
    submitMessage,
    updateMessageInput,
    handleMessageSelection,
}) => (
    <div className="rtc-grid-container">
        <div className="rtc-grid-chat">
            <RtcMessenger
                tempInput={messageInput}
                messages={messages}
                onKeyUp={submitMessage}
                onChange={updateMessageInput}
                onSelection={handleMessageSelection}
            />            
        </div>
        <div className="rtc-grid-trace-info">
            <TraceInformation serviceTrace={serviceTrace}/>
        </div>
        <div className="rtc-grid-trace">
            <NetworkTrace   
                onSelection={setServiceTrace}
                trace={latestTrace}
            />
        </div>
    </div>
));


export default Layout(CoreRTC);

import React from 'react';

import './orva-rtc.scss';

const RtcMessage = ({ sender, message }) => (
  <div className={sender === 'orva' ? 'rtc-message-orva' : 'rtc-message-client'}>
    {sender === 'orva' && (
      <>
        Logo
      </>
    )}

    {message}
  </div>
)

const RtcMessages = ({ messages, className }) => (
  <div className={className}>
    {
      messages.map(message => (
        <RtcMessage {...message} />
      ))
    }
  </div>
);

export default ({ messages }) => (
  <div className="rtc-chat-container">
    <RtcMessages className="rtc-chat-messages" messages={messages} />
    <input />
  </div>
);

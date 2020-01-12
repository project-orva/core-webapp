import React from 'react';

import './styles.css';

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

const RtcMessages = ({ messages, className }) => messages.length === 0 ? (
  <>
   <div className={className}>
     <div className="rtc-no-content">
       No Messages
     </div>
   </div>
  </>
) : (
  <div className={className}>
    {
      messages.map(message => (
        <RtcMessage {...message} />
      ))
    }
  </div>
);

export default ({ messages = [], onKeyUp = () => {} }) => (
  <div className="rtc-container">
    <RtcMessages className="rtc-messages" messages={messages} />
    <div className="rtc-input-container">
      <input className="rtc-input" onKeyUp={onKeyUp}/>
    </div>
  </div>
);

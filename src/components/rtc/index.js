import React from 'react';

import { Empty } from 'antd';

import './styles.css';

const RtcMessage = ({ sender, message }) => (
  <div className={sender === 'orva' ? 'rtc-message-orva' : 'rtc-message-client'}>   
    {message}
  </div>
)

const RtcMessages = ({ messages, className }) => messages.length === 0 ? (
  <>
   <div className={className}>
     <div className="rtc-no-content">
      <Empty description={false} />
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

export default ({
  messages = [],
  onKeyUp = () => {},
  onChange = () => {},
  tempInput = '',
}) => (
  <div className="rtc-container">
    <RtcMessages className="rtc-messages" messages={messages} />
    <div className="rtc-input-container">
      <input
        className="rtc-input"
        value={tempInput}
        onChange={onChange}
        onKeyPress={onKeyUp}
      />
    </div>
  </div>
);

import React, { useEffect, useRef } from 'react';

import { Empty } from 'antd';

import './styles.css';

const RtcMessage = ({ sender, message }) => (
  <div className={sender === 'orva' ? 'rtc-message-orva' : 'rtc-message-client'}>
    {message}
  </div>
)

const RtcMessages = ({ messages, className, messagesEndRef }) => messages.length === 0 ? (
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
        messages.map((message, idx) => (
          <RtcMessage key={idx} {...message} />
        ))
      }
      <div ref={messagesEndRef} />
    </div>
  );

export default ({
  messages = [],
  onKeyUp = () => { },
  onChange = () => { },
  tempInput = '',
}) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    if(messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }
  
  useEffect(scrollToBottom, [messages]);

  return (
    <div className="rtc-container">
      <RtcMessages
        messagesEndRef={messagesEndRef}
        className="rtc-messages"
        messages={messages}
      />
      <div className="rtc-input-container">
        <input
          className="rtc-input"
          value={tempInput}
          onChange={onChange}
          onKeyPress={onKeyUp}
        />
      </div>
    </div>
  )
}

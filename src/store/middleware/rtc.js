import io from 'socket.io-client';

export default store => {
  const socket = io("http://localhost:3006");
  const { creds: { userid, ssid } } = store.getState()

  socket.on('connect', () => {
    socket.on(`chat-${userid}_${ssid}`, ({ message, duration }) => store.dispatch({
      type: 'UPDATE_RESPONSE_TELEMETRY',
      value: {
        response: { message, sender: 'orva'},
        duration,
      }
    }));
  });

  return next => (action) => {
    switch (action.type) {
      case 'SOCK_RTC_MESSAGE': {
        const { payload } = action;
        store.dispatch({ type: 'ADD_RTC_MESSAGE', value: {
          message: payload.request,
          sender: payload.userid 
        }});

        socket.emit('subscribeToChat', payload)
      }
      default: {
        next(action);
      }
    }
  }
};
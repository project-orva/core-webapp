import io from 'socket.io-client';
import uuid from 'uuid';

const addTelemetry = ({store, trace, message }) => {
  const transaction = uuid.v4();

  store.dispatch({
    type: 'UPDATE_RESPONSE_TELEMETRY',
    value: {
      response: { message, id: transaction, sender: 'orva' },
      trace: {...trace, id: transaction},
    }
  });

  store.dispatch({
    type: 'UPDATE_ACTIVE_TELEMETRY_TRACE',
    value: trace,
  })
}

export default store => {
  let socket = null;

  return next => (action) => {
    switch (action.type) {
      case 'SOCK_RTC_MESSAGE': {
        const { payload } = action;
        store.dispatch({
          type: 'ADD_RTC_MESSAGE', value: {
            message: payload.request,
            id: uuid(),
            sender: payload.uid
          }
        });

        socket.emit('subscribeToChat', payload)
        break;
      }
      case 'ESTABLISH_RTC_CONNECTION': {
        socket = io("http://localhost:3006");
        const { creds: { id, ssid } } = store.getState()

        socket.on('connect', () => {
          socket.on(`chat-${id}_${ssid}`, ({ message, trace }) => {
            addTelemetry({store, message, trace });
          });
        });
        break;
      }
      default: {
        next(action);
      }
    }
  }
};
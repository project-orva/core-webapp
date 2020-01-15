import io from 'socket.io-client';

export default store => {
  let socket = null;

  return next => action => {   
    switch (action.type) {
      case 'ESTABLISH_SERVICE_HEALTH_SOCKET': {
        socket = io("http://localhost:3006");
        socket.on('connect', () => {
          socket.on('servicesHeathStatus', (response) => {

            store.dispatch({
              type: 'UPDATE_ALL_SERVICES_HEALTH',
              payload: {...response},
            });
            
          });
        });

        break;
      }
      default: {
        next(action);
      }
    }

  }
}
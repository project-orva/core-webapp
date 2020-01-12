import io from 'socket.io-client';

const socket = io("http://localhost:3006");

export const subscribeToRTC = ({ handler, name }) => {
  socket.on('connect', () => {
    socket.on(name, (response) => handler(response))
  });
}

export const publishToRTC = (request) => {
  socket.emit('subscribeToChat', request);
}
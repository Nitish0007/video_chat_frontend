//  import { io } from 'socket.io-client';
import socketIO from 'socket.io-client';

const URL = 'http://localhost:5500'

export const socket = socketIO.connect(URL);

console.log(socket);

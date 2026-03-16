import { Manager } from 'socket.io-client';

const manager = new Manager('http://localhost:8002', {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelayMax: 5000,
});

export const socket = manager.socket('/');
export const notificationSocket = manager.socket('/notification');
export const syncSocket = manager.socket('/sync');

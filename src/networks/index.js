// @flow
import axios from 'axios';
import WebSocket from './Socket';
// type
import type Axios from 'axios';

function setAxios() {
  const instance = axios.create();
  switch (process.env.NODE_ENV) {
    case 'development':
      instance.defaults.baseURL = 'http://localhost:8000/api/v1';
      instance.defaults.headers.common['Authorization'] =
        'TOKEN 444eebcafaf886cfa522d8e0628ccca28f6de7e7';
      instance.defaults.withCredentials = true;
      break;
    case 'production':
      instance.defaults.baseURL = 'https://www.mediscri.com/api/v1';
      break;
    default:
      console.log(`INVALID MODE`);
  }

  instance.defaults.headers.post['Content-Type'] = 'application/json';
  return instance;
}

function setWebSocket() {
  switch (process.env.NODE_ENV) {
    case 'development':
      WebSocket.setBaseURL('ws://localhost:8000/ws/v1');
      break;
    case 'production':
      WebSocket.setBaseURL('wss://www.mediscri.com/ws/v1');
      break;
    default:
      console.log(`INVALID MODE`);
  }

  const instance = WebSocket.getInstance();
  return instance;
}

// *** HTTP, SOCKET INSTANCE
export const http: Axios = setAxios();
export const socket: WebSocket = setWebSocket();

// *** SPECIFIC NETWORK MODULES
export { default as Chart } from './Chart';
export { default as Patient } from './Patient';

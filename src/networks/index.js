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
      break;
    case 'production':
      instance.defaults.baseURL =
        'http://ec2-13-209-17-145.ap-northeast-2.compute.amazonaws.com:8000/api/v1';
      break;
    default:
      console.error(`INVALID MODE`);
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
      WebSocket.setBaseURL(
        'ws://ec2-13-209-17-145.ap-northeast-2.compute.amazonaws.com:8000/ws/v1'
      );
      break;
    default:
      console.error(`INVALID MODE`);
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

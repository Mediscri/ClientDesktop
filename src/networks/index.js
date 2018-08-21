import axios from 'axios';
import WebSocket from './Socket';

const DEVELOPMENT = 'DEVELOPMENT';
const PRODUCTION = 'PRODUCTION';

const MODE = DEVELOPMENT;

function setAxios(mode: string) {
  let instance = null;
  switch (mode) {
    case PRODUCTION:
      instance = axios.create({ baseURL: 'https://www.mediscri.com/api/v1' });
      break;
    case DEVELOPMENT:
      instance = axios.create({
        baseURL: 'http://localhost:8000/api/v1',
        headers: {
          Authorization: 'TOKEN 47820c0faa73dee026e3dd24fcd029880312420f',
        },
      });
      break;
    default:
      console.log(`INVALID MODE. ${MODE}`);
  }

  return instance;
}

function setWebSocket(mode: string) {
  switch (mode) {
    case PRODUCTION:
      WebSocket.setBaseURL('wss://www.mediscri.com/ws/v1');
      break;
    case DEVELOPMENT:
      WebSocket.setBaseURL('ws://localhost:8000/ws/v1');
      break;
    default:
      console.log(`INVALID MODE. ${MODE}`);
  }

  const instance = WebSocket.getInstance();
  return instance;
}

// *** HTTP, SOCKET INSTANCE
export const http = setAxios(MODE);
export const socket = setWebSocket(MODE);

// *** SPECIFIC NETWORK MODULES
export { default as Chart } from './Chart';
export { default as Patient } from './Patient';

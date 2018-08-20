import axios from 'axios';
import WebSocket from './Socket';

const DEVELOPMENT = 'DEVELOPMENT';
const PRODUCTION = 'PRODUCTION';

const MODE = DEVELOPMENT;

function setAxios(mode: string) {
  let baseURL = '';
  switch (mode) {
    case PRODUCTION:
      baseURL = 'https://www.mediscri.com/api/v1';
      break;
    case DEVELOPMENT:
      baseURL = 'http://localhost:8000/api/v1';
      break;
    default:
      console.log(`INVALID MODE. ${MODE}`);
      return;
  }

  const instance = axios.create({
    baseURL,
    headers: {
      Authorization: 'TOKEN 47820c0faa73dee026e3dd24fcd029880312420f',
    },
  });
  return instance;
}

function setWebSocket(mode: string) {
  let baseURL = '';
  switch (mode) {
    case PRODUCTION:
      baseURL = 'wss://www.mediscri.com/ws/v1';
      break;
    case DEVELOPMENT:
      baseURL = 'ws://localhost:8000/ws/v1';
      break;
    default:
      console.log(`INVALID MODE. ${MODE}`);
      return;
  }

  WebSocket.setBaseURL(baseURL);
  const instance = WebSocket.getInstance();
  return instance;
}

// *** HTTP, SOCKET INSTANCE
export const http = setAxios(MODE);
export const socket = setWebSocket(MODE);

// *** SPECIFIC NETWORK MODULES
export { default as Chart } from './chart.test';

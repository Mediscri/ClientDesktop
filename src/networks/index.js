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
  }

  const instance = axios.create({ baseURL });
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
  }

  const instance = WebSocket.getInstance();
  WebSocket.setBaseURL(baseURL);
  return instance;
}

// http(axios), socket instance
export const http = setAxios(MODE);
export const socket = setWebSocket(MODE);
// specific network modules
export { default as Chart } from './chart.test';

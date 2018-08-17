const DEVELOPMENT = 'DEVELOPMENT';
const PRODUCTION = 'PRODUCTION';

function httpURL(mode: string) {
  switch (mode) {
    case PRODUCTION:
      return 'https://www.mediscri.com/api/v1';
    case DEVELOPMENT:
    default:
      return 'http://localhost:8000/api/v1';
  }
}

function wsURL(mode: string) {
  switch (mode) {
    case PRODUCTION:
      return 'wss://www.mediscri.com/ws/v1';
    case DEVELOPMENT:
    default:
      return 'ws://127.0.0.1:8000/ws/v1';
  }
}

const MODE = DEVELOPMENT;

export const baseHTTP = httpURL(MODE);
export const baseWS = wsURL(MODE);

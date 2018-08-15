const DEVELOPMENT = 'DEVELOPMENT';
const PRODUCTION = 'PRODUCTION';

function httpURL(mode: string) {
  switch (mode) {
    case PRODUCTION:
      return 'https://www.mediscri.com/api/v1';
    case DEVELOPMENT:
    default:
      return 'localhost:8000/api/v1';
  }
}

function wsURL(mode: string) {
  switch (mode) {
    case PRODUCTION:
      return 'ws://https://www.mediscri.com/ws/v1';
    case DEVELOPMENT:
    default:
      return 'ws://localhost:8000/ws/v1';
  }
}

const MODE = DEVELOPMENT;

export const baseHTTP = httpURL(MODE);
export const baseWS = wsURL(MODE);

const DEVELOPMENT = 'DEVELOPMENT';
const PRODUCTION = 'PRODUCTION';

function setEndpoint(mode) {
  switch (mode) {
    case PRODUCTION:
      return 'ws://https://api.mediscri.com/';
    case DEVELOPMENT:
    default:
      return 'ws://localhost:8000/';
  }
}

export function connect(endpoint) {
  try {
    const baseURL = setEndpoint(DEVELOPMENT);
    const socket = new WebSocket(baseURL + endpoint);
    console.log(`Socket Status: ${socket.readyState}`);

    return socket;
  } catch (e) {
    console.error(e);
  }
}

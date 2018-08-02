// @flow
const DEVELOPMENT = 'DEVELOPMENT';
const PRODUCTION = 'PRODUCTION';

function setBaseURL(mode: string) {
  switch (mode) {
    case PRODUCTION:
      return 'ws://https://api.mediscri.com/';
    case DEVELOPMENT:
    default:
      return 'ws://localhost:8000/chat/test/';
  }
}

class Socket {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!Socket.instance) {
      Socket.instance = new Socket();
    }
    return Socket.instance;
  }

  constructor() {
    this.socket = null;
  }

  connect() {
    const path = setBaseURL(DEVELOPMENT);
    this.socket = new WebSocket(path);

    this.socket.onopen = () => {
      console.log(`WebSocket open - ${path}`);
    };
    this.socket.onmessage = e => {
      console.log(e.data);
    };
    this.socket.onerror = e => {
      console.log(e.message);
    };
    this.socket.onclose = () => {
      console.log(`WebSocket closed, try to reconnect.`);
      // this.connect(endpoint);
    };
  }
}

const SocketInstance = Socket.getInstance();
export default SocketInstance;

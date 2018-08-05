// @flow
const DEVELOPMENT = 'DEVELOPMENT';
const PRODUCTION = 'PRODUCTION';

function setBaseURL(mode: string) {
  switch (mode) {
    case PRODUCTION:
      return 'ws://https://api.mediscri.com/';
    case DEVELOPMENT:
    default:
      return 'ws://localhost:8000/ws/chat/test/';
  }
}

class Socket {
  socket: WebSocket;

  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!Socket.instance) {
      Socket.instance = new Socket();
    }
    return Socket.instance;
  }

  constructor() {
    //$FlowFixMe
    this.socket = null;
  }

  connect() {
    const path = setBaseURL(DEVELOPMENT);
    this.socket = new WebSocket(path);

    this.socket.onopen = () => {
      console.log(`WebSocket open - ${path}`);
    };
    this.socket.onmessage = e => {
      // TODO: dispatch to store
      console.log(e.data);
    };
    this.socket.onerror = e => {
      console.log(e);
    };
    this.socket.onclose = () => {
      console.log(`WebSocket closed. Try to reconnect...`);
      this.connect();
    };
  }
}

const SocketInstance: Socket = Socket.getInstance();
export default SocketInstance;

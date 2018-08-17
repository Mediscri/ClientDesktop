import { baseWS } from './baseURL';

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

  connect(path) {
    this.socket = new WebSocket(baseWS + path);

    this.socket.onopen = e => {
      console.log('socket open');
    };
    this.socket.onmessage = e => {
      // TODO: dispatch to store
      console.log(JSON.parse(e.data));
    };
    this.socket.onerror = e => {
      console.log(e);
    };
    this.socket.onclose = () => {
      console.log(`socket unexpectly closed, try to reconnect...`);
      this.connect(path);
    };
  }

  send(data) {
    this.socket.send(JSON.stringify(data));
  }

  close() {
    // @Override
    this.socket.onclose = () => console.log(`socket closed`);
    this.socket.close();
  }
}

const SocketInstance: Socket = Socket.getInstance();
export default SocketInstance;

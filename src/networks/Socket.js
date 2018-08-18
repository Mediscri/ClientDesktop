import { baseWS } from './baseURL';
import { updateState } from '../modules/socket';
// type
import type { Dispatch } from 'redux';

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

  connect(path, dispatch: Dispatch) {
    this.socket = new WebSocket(baseWS + path);
    updateState(dispatch);

    this.socket.onopen = e => {
      updateState(dispatch);
      // *** FOR TEST
      this.send({ message: 'hello' });
    };
    this.socket.onmessage = e => {
      console.log(JSON.parse(JSON.parse(e.data)));
    };
    this.socket.onerror = e => {
      updateState(dispatch);
      console.log(e);
    };
    this.socket.onclose = () => {
      console.log(`socket unexpectly closed, try to reconnect...`);
      updateState(dispatch);
      this.connect(path);
    };
  }

  send(data) {
    this.socket.send(JSON.stringify(data));
  }

  close(dispatch: Dispatch) {
    // @Override
    this.socket.onclose = () => updateState(dispatch);
    this.socket.close();
  }
}

const SocketInstance: Socket = Socket.getInstance();
export default SocketInstance;

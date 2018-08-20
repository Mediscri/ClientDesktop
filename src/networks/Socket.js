import { updateState } from '../modules/socket';
import { createItem } from '../modules/chart';
// type
import type { Dispatch } from 'redux';

class Socket {
  // type
  socket: WebSocket;

  static instance = null;
  static baseURL: string = null;

  static getInstance() {
    if (!Socket.instance) {
      Socket.instance = new Socket();
    }
    return Socket.instance;
  }

  static setBaseURL(baseURL: string) {
    if (!Socket.baseURL) {
      Socket.baseURL = baseURL;
    }
  }

  constructor() {
    //$FlowFixMe
    this.socket = null;
  }

  connect(path: string, dispatch: Dispatch) {
    this.socket = new WebSocket(Socket.baseURL + path);
    updateState(dispatch);

    this.socket.onopen = e => {
      updateState(dispatch);
    };
    this.socket.onmessage = e => {
      const res = JSON.parse(JSON.parse(e.data));

      let maxAccuracy = { accuracy: -1, category: null };
      for (const data of res.deep_output) {
        if (maxAccuracy.accuracy < data.accuracy) {
          // TODO: remove toLowerCase() function
          maxAccuracy = {
            category: data.category.toLowerCase(),
            accuracy: data.accuracy,
          };
        }
      }

      createItem({
        ...maxAccuracy,
        nextText: res.raw_sentence,
      })(dispatch);
    };
    this.socket.onerror = e => {
      console.log(e);
      updateState(dispatch);
    };
    this.socket.onclose = () => {
      console.log(`socket unexpectly closed, try to reconnect...`);
      updateState(dispatch);
      this.connect(
        path,
        dispatch
      );
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

export default Socket;

// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// network
import Socket from '../networks/WebSocket';
// pages
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
// components
import Fullscreen from '../components/Fullscreen';
import Flex from '../components/Flex';

export default class App extends Component<{}> {
  componentDidMount() {
    const socket = Socket;
    socket.connect();
  }

  render() {
    return (
      <Router>
        <Fullscreen>
          <Navbar />
          <Flex>
            <Sidebar />
            <Dashboard />
          </Flex>
        </Fullscreen>
      </Router>
    );
  }
}

// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// pages
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
// components
import Fullscreen from '../components/Fullscreen';
import Flex from '../components/Flex';
// network
import { Patient } from '../networks';

export default class App extends Component<{}> {
  render() {
    Patient.get();
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

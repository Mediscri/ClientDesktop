// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// pages
import Navbar from './Navbar';
import Dashboard from './Dashboard';
// components
import Fullscreen from '../components/Fullscreen';
import Flex from '../components/Flex';

export default class App extends Component<{}> {
  render() {
    return (
      <Router>
        <Fullscreen>
          <Navbar />
          <Flex>
            <Dashboard />
            <div />
          </Flex>
        </Fullscreen>
      </Router>
    );
  }
}

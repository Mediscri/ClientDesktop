// @flow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// pages
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
// components
import Fullscreen from '../components/Fullscreen';
import Flex from '../components/Flex';
import CheckAuth from '../components/CheckAuth';

const Main = ({ match }) => (
  <Flex>
    <CheckAuth />
    <Route path={`${match.url}`} component={Sidebar} />
    <Route path={`${match.url}/:patientId`} component={Dashboard} />
  </Flex>
);

const App = () => (
  <Fullscreen>
    <Navbar />
    <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
    <Route path="/dashboard" component={Main} />
  </Fullscreen>
);

export default App;

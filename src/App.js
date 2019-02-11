import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import './App.css';
import { LocalizeProvider } from 'react-localize-redux';

class App extends Component {
  render() {
    return (
      <LocalizeProvider>
        <Layout>

        </Layout>
      </LocalizeProvider>
    );
  }
}

export default App;

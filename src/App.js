import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import './App.css';
import { LocalizeProvider } from 'react-localize-redux';

import WelcomePage from './components/WelcomePage/WelcomePage';
import Fields from './containers/Fields/Fields';
import OliveOilHarvest from './containers/Harvesting/OliveOil/OliveOilHarvest';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <LocalizeProvider>
        <Layout>
          <Route path="/Fields" component={Fields} />
          <Route path="/Harvests" component={OliveOilHarvest} />
          <Route path="/" exact component={WelcomePage} />
        </Layout>
      </LocalizeProvider>
    );
  }
  
}

export default App;

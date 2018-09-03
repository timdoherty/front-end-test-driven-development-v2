import React from 'react';
import { ModuleProvider } from 'redux-modules';
import { combineReducers } from 'redux-loop';

import searchModule from './search/module';
import nowPlayingModule from './nowPlaying/module';
import configureStore from './utils/configureStore';
import logo from './logo.svg';
import './App.css';

const { reducer: searchReducer } = searchModule;
const { reducer: nowPlayingReducer } = nowPlayingModule;

const reducers = [
  {
    name: 'search',
    reducer: searchReducer
  },
  {
    name: 'nowPlaying',
    reducer: nowPlayingReducer
  }
];

const store = configureStore(state => state, {});

const App = () => (
  <ModuleProvider
    store={store}
    staticReducers={reducers}
    combineReducers={combineReducers}
  >
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  </ModuleProvider>
);

export default App;

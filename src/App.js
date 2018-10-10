import React from 'react';
import { ModuleProvider } from 'redux-modules';
import { combineReducers } from 'redux-loop';
import { BrowserRouter } from 'react-router-dom';
import '@procore/core-icons';

import searchModule from './search/module';
import nowPlayingModule from './nowPlaying/module';
import configureStore from './utils/configureStore';
import Layout from './components/Layout';

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
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </ModuleProvider>
);

export default App;

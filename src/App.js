import React from 'react';
import { ModuleProvider } from 'redux-modules';
import { combineReducers } from 'redux-loop';

import searchModule from './search/module';
import nowPlayingModule from './nowPlaying/module';
import configureStore from './utils/configureStore';
import App from './components/App';

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

const AppContainer = () => (
  <ModuleProvider
    store={store}
    staticReducers={reducers}
    combineReducers={combineReducers}
  >
    <App />
  </ModuleProvider>
);

export default AppContainer;

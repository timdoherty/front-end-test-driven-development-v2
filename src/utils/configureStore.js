import { createStore } from 'redux';
import { install } from 'redux-loop';

function configureStore(reducer = state => state, initialState = {}) {
  const store = createStore(
    reducer,
    initialState,
    install()
  );
  return store;
}

export default configureStore;

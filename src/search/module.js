import { camelCase } from 'lodash';

function fluxStandardAction(type) {
  return function fsa(payload, meta, error) {
    return {
      type,
      payload,
      meta,
      error
    };
  };
}

let constants = {
  DO_SEARCH: 'DO_SEARCH',
  GET_SEARCH_METADATA: 'GET_SEARCH_METADATA',
  ON_SEARCH_FAILURE: 'ON_SEARCH_FAILURE',
  ON_SEARCH_METADATA_SUCCESS: 'ON_SEARCH_METADATA_SUCCESS',
  ON_SEARCH_METADATA_FAILURE: 'ON_SEARCH_METADATA_FAILURE',
  ON_SEARCH_SUCCESS: 'ON_SEARCH_SUCCESS'
};

const actions = Object.keys(constants).reduce(
  (accumulator, key) => {
    accumulator[camelCase(key)] = fluxStandardAction(key);
    return accumulator;
  },
  {}
);

function reducer(state, action) {
  switch (action.type) {
    case constants.DO_SEARCH:
      // TODO: do the search
      return {
        ...state,
        isLoading: true,
        searchTerm: action.payload
      };
    case constants.GET_SEARCH_METADATA:
      // TODO: get the data
      return {
        ...state,
        isLoading: true
      };
    case constants.ON_SEARCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case constants.ON_SEARCH_METADATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        searchMetadata: action.payload.data
      };
    case constants.ON_SEARCH_METADATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case constants.ON_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        searchResults: action.payload.data
      };
  }
};

export default {
  actions,
  constants,
  reducer
};

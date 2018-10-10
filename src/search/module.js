const constants = {
  CLEAR_SEARCH: 'CLEAR_SEARCH',
  GET_SEARCH_METADATA: 'GET_SEARCH_METADATA',
  ON_SEARCH_FAILURE: 'ON_SEARCH_FAILURE',
  ON_SEARCH_METADATA_SUCCESS: 'ON_SEARCH_METADATA_SUCCESS',
  ON_SEARCH_METADATA_FAILURE: 'ON_SEARCH_METADATA_FAILURE',
  ON_SEARCH_SUCCESS: 'ON_SEARCH_SUCCESS',
  DO_SEARCH: 'DO_SEARCH'
};

const actions = {
  clearSearch(payload, meta, error) {
    return {
      type: constants.CLEAR_SEARCH,
      payload,
      meta,
      error
    };
  },
  doSearch(payload, meta, error) {
    return {
      type: constants.DO_SEARCH,
      payload,
      meta,
      error
    };
  },
  getSearchMetadata(payload, meta, error) {
    return {
      type: constants.GET_SEARCH_METADATA,
      payload,
      meta,
      error
    };
  },
  onSearchFailure(payload, meta, error) {
    return {
      type: constants.ON_SEARCH_FAILURE,
      payload,
      meta,
      error
    };
  },
  onSearchMetadataSuccess(payload, meta, error) {
    return {
      type: constants.ON_SEARCH_METADATA_SUCCESS,
      payload,
      meta,
      error
    };
  },
  onSearchMetadataFailure(payload, meta, error) {
    return {
      type: constants.ON_SEARCH_METADATA_FAILURE,
      payload,
      meta,
      error
    };
  },
  onSearchSuccess(payload, meta, error) {
    return {
      type: constants.ON_SEARCH_SUCCESS,
      payload,
      meta,
      error
    };
  }
};

function reducer(state, action) {
  switch (action.type) {
    case constants.CLEAR_SEARCH:
      return {
        ...state,
        searchTerm: null,
        searchResults: null,
        searchMetadata: null
      };
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
}

export default {
  actions,
  constants,
  reducer
};

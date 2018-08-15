import { createModule } from 'redux-modules';

export default createModule({
  name: 'search',
  initialState: {},
  transformations: {
    setSearchTerm(state, action) {
      const { payload } = action;
      return {
        ...state,
        searchTerm: payload
      };
    },
    clearSearchTerm(state, payload) {
      return {
        ...state,
        searchTerm: null
      };
    }
  }
});

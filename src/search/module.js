import { createModule } from 'redux-modules';

import searchSelector from './selector';

export default createModule({
  name: 'search',
  initialState: {},
  selector: searchSelector,
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

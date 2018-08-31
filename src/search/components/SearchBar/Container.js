import React from 'react';
import { connectModule } from 'redux-modules';

import searchModule from '../../module';
import SearchBar from './SearchBar';

function SearchBarContainer(props) {
  const { actions: { doSearch }, ...rest } = props;
  return (
    <SearchBar
      onSearchChanged={doSearch}
      {...rest}
    />
  );
}

export default connectModule(searchModule)(SearchBarContainer);

import React from 'react';

import { Input } from '@procore/core-react';

export default function Search(props) {
  const { onSearchChanged } = props;
  return (
    <Input onKeyUp={({ key, target: { value } }) => {
      if (key === 'Enter' && !!value) {
        onSearchChanged(value);
      }
    }}/>
  );
}

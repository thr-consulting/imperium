You can access the state using the state selector hook and perform actions using Redux's `dispatch()` and your exported actions.

```typescript jsx
import React from 'react';
import {useDispatch} from 'react-redux';
import {setNum, useSampleState} from '../state';

export default function Example() {
  const state = useSampleState(); // Select just your slice of state
  const dispatch = useDispatch(); // Get the dispatch() function

  return (
    <>
      <input value={state.num} onChange={ev => {
        dispatch(setNum(ev.target.value));
      }} />
    </>
  );
}
```

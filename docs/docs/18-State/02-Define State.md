State is separated into slices which are independent of each other. Usually in a `state.ts` file, create and export a state
slice, any selector hooks, and any actions.

```typescript jsx
import {createSliceHook} from '@imperium/state';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

// This is normal Redux, and creates a state slice
export const state = createSlice({
  name: 'state-sample',
  initialState: {
    num: 5,
  },
  reducers: {
    setNum: (st, action: PayloadAction<number>) => {
      st.num = action.payload;
    },
  },
});

export const useSampleState = createSliceHook(state);

export const {setNum} = state.actions;
```

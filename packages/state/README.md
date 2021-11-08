# @imperium/state

[![Coverage_badge](../../docs/assets/coverage/state/coverage.svg)](assets/coverage/state/index.html)
[![GitHub tag](https://img.shields.io/github/tag/darkadept/imperium.svg)](https://github.com/darkadept/imperium/tags/)
[![GitHub issues](https://img.shields.io/github/issues/darkadept/imperium.svg)](https://github.com/darkadept/imperium/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/darkadept/imperium.svg)](https://GitHub.com/darkadept/imperium/pull/)

[![GitHub license](https://img.shields.io/github/license/darkadept/imperium.svg)](https://github.com/darkadept/imperium/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/darkadept/imperium.svg)](https://github.com/darkadept/imperium/graphs/contributors/)

# About
This is an Imperium client module providing an abstraction for global state, based on Redux.

The major parts of this package are:

# Getting Started
  * Imperium client module

## Add to client modules
In your `clientModules.ts` file:
```typescript
export function clientModules(): ImperiumClientModule[] {
    return [
        // ...other client modules	
        stateClientModule(),
    ];
}
```

## Define state in each feature
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

## Add state slice to your feature index
In your feature `index.ts` file, add the state slice.
```typescript
import {state} from './state';

export function feature(): ImperiumStateClientModule {
  return {
    name: 'Feature',
    state,
 };
}
```

## Use state in your components
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

# Custom Types
Normally, only serializable types can be used in state. You can define custom types with the following:

```typescript
export const state = createSlice({
  name: 'state-sample',
  initialState: {
    date: LocalDate.now().toEpochDay(), // Initial state needs to be serializable
  },
  reducers: {
    setDate: { // Using the reducer/prepare object is standard Redux
      reducer: (st, action: PayloadAction<number>) => {
        st.date = action.payload;
      },
	  // The conversion from our custom type to a serializable type happens in this prepare function
      prepare: (date: LocalDate) => ({payload: date.toEpochDay()}),
    },
  },
});

// When creating state selector hooks, use the optional transformers parameter to define
// functions that convert from serializable state to our custom types.
export const useSampleState = createSliceHook(state, {
  date: n => LocalDate.ofEpochDay(n),
});
```

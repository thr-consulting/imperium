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

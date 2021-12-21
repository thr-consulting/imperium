## Define a layout in each feature
A layout defines all the various menus in your application. Usually in a `layout.tsx` file, export a `LayoutData` variable.
All fields are optional.

```typescript jsx
export const layout: LayoutData = {
  dataHooks: [ /* datahooks array */ ],
  primaryMenu: [ /* horizontal layout items */ ],
  secondaryMenu: [ /* layout items */ ],
  statusbar: [ /* horizontal layout items */ ],
  footer: [ /* horizontal layout items */ ],
}
```

## Layout

### Data Hooks
Data Hooks are React hooks that don't return anything. They are usually used to retrieve values from a graphql query and
then use the returned data to set state using @imperium/state (Redux).

```typescript
function useGetData() {
    const dispatch = useDispatch();
    const {loading, data} = useGetDataQuery();
    
    useEffect(() => {
	  if (!loading) dispatch(action(data.getQuery.someData));
    }, [loading, data, dispatch]);
}
```

### Primary Menu
The primary menu runs horizontally across the top of the page.

When the page shrinks to mobile size, all non-sticky menu items are removed and placed at the bottom of the secondary menu.
A toggle to show/hide the secondary menu is also displayed in the top left.

### Secondary Menu
The secondary menu runs vertically on the left side of the page.

When the page shrinks to mobile size, the secondary menu can be shown or hidden.

### Statusbar
The statusbar runs horizontally just below the primary menu.

### Footer
The footer runs horizontally at the bottom of the page.

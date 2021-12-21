## Define content pages in each feature
Pages can be defined from routes (see @imperium/router). Usually in a `pages.tsx` file, export from a `createPages()` call.
Each key must align with a route defined in your router.

Using `createPages()` removes the need from having to use `routes.renderRouteProps()` directly.

The `content` field is required, all others are optional.

```typescript jsx
import {routes} from './routes';

export const routeProps = createPages(routes, {
  noParam: {
    dataHooks: [ /* datahooks array */ ],
    stateSelectorHook: hook || [ /* array of hooks */ ],
    content: (data: Data) => JSX.Element,
    header: /*One of: string | {title: string, icon?: string} | (data: Data) => {title: string, icon?: string} */,
    sidebar: [ /* SidebarItem array */ ],
    full: boolean,
  }
});
```

## Page

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

### State Selector Hook(s)
Pass a state select hook (or array of hooks) that return data, usually from Redux state.

This state data is added to the Data object. The data object is passed down to each Sidebar Item.

### Content
This is required and is used to render a component as content for the specified route.

### Header
An optional header string, object, or function that returns an object. Used to determine the header text and icon.
If header is not specified, there will be no header.

### Sidebar
Array of Sidebar Items. The sidebar is an optional vertical menu on the right side of the content area. It should usually
be comprised of button actions. There are different types of sidebar items that can be rendered.

### Full
Sets the height of the content area to 100% and has no margins.

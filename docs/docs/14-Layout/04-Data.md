A specific set of data is created and used by all layout items and page content in various ways.

```typescript
interface Data {
	loc: Location;
	route: {
		path: string[];
		hash: string;
		search: Record<string, any>;
	};
	state: State;
	active: boolean;

	// Page data has an additional field:
	params: RouteParameters;
}
```

### loc
A location object matching the current React Router location. It's defined somewhat like the following. See React Router for more information.

```typescript
loc: Location
```

```typescript
interface Location {
  state: object | null;
  key: string;
  pathname: string;
  search: string;
  hash: string;
}
```

### route
The route object is basically the same as the Location object, but processed for easier use in visibility queries.
```typescript
route: {
  path: string[]; // An array of strings. The loc.pathname split by the '/' character.
  hash: string; // A copy of the loc.hash string.
  search: Record<string, any>; // The loc.search string, parsed by queryString.parse(). See node package 'querystring'.
}
```

### state
Layout and content items can use hooks that select slices of Redux state (see @imperium/state). This is the selected state merged together.

Parent items can also select state. This state is merged together with child state and passed to the child.

```typescript
state: Record<string, any>
```

### active
This is only relevant in layout items that redirect to a route. Active is true when the current path matches the route `to` path, otherwise it's false.

```typescript
active: boolean
```

### params
This is only available to page data (aka `ContentData`). Since each page is rendered from a route, the type of the route parameters are known.
If the route doesn't have any parameters, this type is `never`. If the route does have parameters this is an object, typed with
the parameters as fields.

```typescript
params: RouteParameters
```

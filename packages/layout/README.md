# @imperium/layout

[![Coverage_badge](../../docs/assets/coverage/layout/coverage.svg)](assets/coverage/layout/index.html)
[![GitHub tag](https://img.shields.io/github/tag/darkadept/imperium.svg)](https://github.com/darkadept/imperium/tags/)
[![GitHub issues](https://img.shields.io/github/issues/darkadept/imperium.svg)](https://github.com/darkadept/imperium/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/darkadept/imperium.svg)](https://GitHub.com/darkadept/imperium/pull/)

[![GitHub license](https://img.shields.io/github/license/darkadept/imperium.svg)](https://github.com/darkadept/imperium/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/darkadept/imperium.svg)](https://github.com/darkadept/imperium/graphs/contributors/)

# About
This is an Imperium client module providing an abstraction for page layout, menu items, and content.

The major parts of this package are:
  * Imperium client module
  * Main layout type: `LayoutData`
  * `createPages()` function

# Getting Started

## Add to client modules
In your `clientModules.ts` file:
```typescript
export function clientModules(): ImperiumClientModule[] {
    return [
        // ...other client modules	
        layoutClientModule(),
    ];
}
```

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

### Data Hooks
Data Hooks are React hooks that don't return anything. They are usually used to retrieve values from a graphql query and
then use the returned data to set state using @imperium/state.

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

## Define content pages in each feature
Pages can be defined from routes (see @imperium/router). Usually in a `pages.tsx` file, export from a `createPages()` call.
Each key must align with a router defined in your router.

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

### Data Hooks
Data Hooks are React hooks that don't return anything. They are usually used to retrieve values from a graphql query and
then use the returned data to set state using @imperium/state.

### State Selector Hook(s)
Pass a state select hook (or array of hooks) that return data, usually from Redux state.

This state data is added to the Data object. The data object is passed down to each Sidebar Item as well.

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

## Add layout and pages to your feature index
In your feature `index.ts` file, add layout and pages (routeProps). Layout is not optional, but it can be an empty object.
Using `createPages()` is entirely optional.
```typescript
import {routeProps} from './pages.tsx';
import {layout} from './layout.tsx';

export function feature(): ImperiumLayoutClientModule & ImperiumRouterClientModule {
  return {
    name: 'Feature',
    layout,
    routeProps, // Use `routeProps` from `createPages()`
 };
}
```

# Concepts

## Data
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

### `loc: Location`
A location object matching the current React Router location. It's defined somewhat like the following. See React Router for more information.
```typescript
interface Location {
  state: object | null;
  key: string;
  pathname: string;
  search: string;
  hash: string;
}
```

### `route`
The route object is basically the same as the Location object, but processed for easier use in visibility queries.
```typescript
route: {
  path: string[]; // An array of strings. The loc.pathname split by the '/' character.
  hash: string; // A copy of the loc.hash string.
  search: Record<string, any>; // The loc.search string, parsed by queryString.parse(). See node package 'querystring'.
}
```

### `state: Record<string, any>`
Layout and content items can use hooks that select slices of Redux state (see @imperium/state). This is the selected state merged together.

Parent items can also select state. This state is merged together with child state and passed to the child.

### `active: boolean`
This is only relevant in layout items that redirect to a route. Active is true when the current path matches the route `to` path, otherwise it's false.

### `params: RouteParameters`
This is only available to page data (aka `ContentData`). Since each page is rendered from a route, the type of the route parameters are known.
If the route doesn't have any parameters, this type is `never`. If the route does have parameters this is an object, typed with
the parameters as fields.

# Layout

## Layout Items
Most layout items have the following properties:

### `weight: number` (optional)
Larger numbers move the item farther to the left or down.

### `visible: Object | (data: Data) => boolean` (optional)
When this is a function, it receives the current Data. If you return true from this function the item is visible.
If you return false, the item is hidden.

When this is an object, it represents a mingo (see npm 'mingo' package) query that is matched against the current Data.
If the mingo query returns true, the item is visible, otherwise the item is hidden.

### `stateSelectorHook: () => State | (() => State)[]` (optional)
Pass a state select hook (or array of hooks) that return data, usually from Redux state.

This state data is added to the Data object.

### `text: string | (data: Data) => string` (required)
Usually required (except for custom layout items). Either a static string or a function that returns a string.
The text is displayed as the items main text.

### `icon: SemanticICONS | (data: Data) => SemanticICONS` (optional)
Similar to the `text` field. If supplied, the icon is shown on the item.

### `moveToKey: string` (optional)
If you would like to have this item moved to a child of a different item (dropdown or submenu), usually from a different
feature, enter the target item's key string here. Note, items do not have keys unless expressly defined.

The item will be removed from its current location and rendered in the target item's children.

## Routed Items
If the item isn't a dropdown, menu or custom the item can be used to link to a route.

### `to: string | (data: Data) => string` (optional)
Will render the item as a link to a route. Also used to determine if this item's route is active.

### `exact: boolean` (optional)
Default is false. Used to determine if the item's route is active. See React Router route props.

### `strict: boolean` (optional)
Used to determine if the item's route is active. See React Router route props.

### `sensitive: boolean` (optional)
Used to determine if the item's route is active. See React Router route props.

## Horizontal Items
If the item is displayed in a horizontal menu it can have additional properties.

### `position: 'left' | 'right'` (optional)
Default is 'left'. Determines if the item is floated to the left or the right of the menu.

### `stickOnMobile: boolean` (optional)
Default is false and only relevant on the primary menu. If true, the item will not be moved to the secondary menu when
in mobile width mode.

## Custom Layout Items
Custom layout items can be used to render any React component.

### `render: (data: Data) => JSX.Element | null` (required)
This will render whatever custom component you want.

## Dropdown Layout Items
Dropdown layout items will render their children as dropdown menus. You cannot include dropdown or submenu items as children.

### `dropdown: LayoutItems[]` (required)
These items are rendered as the children of the dropdown.

### `key: string` (optional)
Dropdown items can be used as a target for other items. See `moveToKey` above.

## Menu Layout Items
Menu layout items will create a submenu inside the normal menu. See Semantic UI as to how these work. Submenu items aren't hidden
behind a click, like a dropdown, but grouped together. You cannot include dropdown or submenu items as children.

### `menu: LayoutItems[]` (required)
These items are rendered as the children of the menu.

### `key: string` (optional)
Menu items can be used as a target for other items. See `moveToKey` above.

# Page Content

## Sidebar Items
Most sidebar items have the following properties:

### `weight: number` (optional)
Larger numbers move the item farther down.

### `visible: Object | (data: ContentData) => boolean` (optional)
When this is a function, it receives the current ContentData. If you return true from this function the item is visible.
If you return false, the item is hidden.

When this is an object, it represents a mingo (see npm 'mingo' package) query that is matched against the current ContentData.
If the mingo query returns true, the item is visible, otherwise the item is hidden.

### `stateSelectorHook: () => State | (() => State)[]` (optional)
Pass a state select hook (or array of hooks) that return data, usually from Redux state.

This state data is added to the ContentData object.

### `text: string | (data: ContentData) => string` (required)
Usually required (except for custom sidebar items). Either a static string or a function that returns a string.
The text is displayed as the items main text.

### `icon: SemanticICONS | (data: ContentData) => SemanticICONS` (optional)
Similar to the `text` field. If supplied, the icon is shown on the item. 

### `color: SemanticCOLORS | (data: ContentData) => SemanticCOLORS` (optional)
Similar to the `text` field. If supplied, the color is applied to the item.

## Routed Items
If the item isn't a special item it can be used to link to a route.

### `to: string | (data: ContentData) => string` (optional)
Will render the item as a link to a route. Also used to determine if this item's route is active.

### `exact: boolean` (optional)
Default is false. Used to determine if the item's route is active. See React Router route props.

### `strict: boolean` (optional)
Used to determine if the item's route is active. See React Router route props.

### `sensitive: boolean` (optional)
Used to determine if the item's route is active. See React Router route props.

## Custom Sidebar Items
Custom sidebar items can be used to render any React component.

### `render: (data: ContentData) => JSX.Element | null` (required)
This will render whatever custom component you want.

## Action Sidebar Items
An action sidebar item fires an `onClick()` event instead of redirecting to a route.

### `onClick: (data: ContentData) => void` (required)
This handler is fired when the sidebar action is clicked.

## Action Form Sidebar Items
This item renders a form that can be submitted.

### `form: (formParams) => JSX.Element | null` (required)
Renders the form fields needed by the form. Usually you'll render a fragment with just the form fields.

`formParams` are mostly derived from TForm (see @thx/controls):

#### `values: Record<string, any>`
Used to set the value of your inputs.

#### `handleChange: (e: ChangeEvent<any>) => void`
Used to notify TForm about changed inputs.

#### `fieldError: (fieldName) => boolean`
Used to determine if a field contains a validation error

#### `data: ContentData`
The content data passed down from the sidebar item.

### `initialValues: Record<string, any> | (data: ContentData) => Record<string, any>` (optional)
Initial values that will be passed to TForm. If a function, can be used to calculate from content data.

### `onSubmit: (values: Record<string, any>, data: ContentData) => void` (optional)
Fired when the form submits.

### `validationSchema: any` (optional)
A yup validation schema, passed directly to TForm.

## Divider Sidebar Items
You can render a divider by using the exported divider item directly.

```typescript
import {dividerSidebarItem} from '@imperium/layout';

createPages(routes, {
  aRoute: {
    sidebar: [
      dividerSidebarItem,	
    ],
  },
});
```

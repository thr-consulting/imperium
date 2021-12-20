---
id: routes
title: Routes
sidebar_label: Routes
---

Route definitions follow React Router with a few additions.

### React Router properties:
You can see React Router properties [here](https://reacttraining.com/react-router/web/api/Route).
  * **path: string** - Any valid URL path or array of paths.
  * **exact: bool** - When true, will only match if the location path matches exactly. 
  * **strict: bool** - When true, a path with a trailing slash will only match a trailing slash.
  * **sensitive: bool** - When true, will match if the path is case sensitive.
  
### RouteDirector properties
You can find the `RouterDirector` component in the `@thx/router` package.

  * **layout: Component** - A React Component to render that usually wraps the content.
  * **content: Component** - A React Component to render.
  
### Layout properties
Layout properties depend on which layout you have specified but should usually include the following properties.

  * **statusbar: Component**
  * **sidebar: Component**
  * **content: Component**
  * **menu: Component**
  * **footer: Component**

### Reroute properties
You can find the `Reroute` component in the `@thx/router` package. Keep in mind that reroute is NOT
secure. It just displays an 'unauthorized' component if accessing a route that the user does not have
access to. Use server-side permissions for real security.

  * **permissions: string | [string]** - Permissions that are required to render the route. 
  * **redirect: bool** - When true, redirects to `/signin` if not logged in or unauthorized.

## Portal Routes
These are special routes that render a popup Portal overtop of other content. While they are defined alongside
other routes, they have different properties. For maximum customization Imperium doesn't actually render the Portal
component for you. It just renders the component outside of the normal layout.

  * **key: string** - _Required_ - Used as the key in the query string as well as the React component key
  * **portal: Component** - _Required_ - The component to display in the Portal

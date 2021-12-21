 sidebar items have the following properties.

## weight
Larger numbers move the item farther down.

```typescript
weight?: number
```

## visible
When this is a function, it receives the current ContentData. If you return true from this function the item is visible.
If you return false, the item is hidden.

When this is an object, it represents a mingo (see npm 'mingo' package) query that is matched against the current ContentData.
If the mingo query returns true, the item is visible, otherwise the item is hidden.

```typescript
visible?: Object | (data: ContentData) => boolean
```

## permissionSelectorHook
Pass a permission selector hook (or array of hooks) that return results of permission checks, usually from `useCan` in @imperium/auth-client.

These permission results are added to the Data object.

```typescript
permissionSelectorHook?: () => PermissionResult | (() => PermissionResult)[]
```

## stateSelectorHook
Pass a state select hook (or array of hooks) that return data, usually from Redux state.

This state data is added to the ContentData object.

```typescript
stateSelectorHook?: () => State | (() => State)[]
```

## text
Usually required (except for custom sidebar items). Either a static string or a function that returns a string.
The text is displayed as the items main text.

```typescript
text: string | (data: ContentData) => string
```

## icon
Similar to the `text` field. If supplied, the icon is shown on the item.

```typescript
icon?: SemanticICONS | (data: ContentData) => SemanticICONS
```

## color
Similar to the `text` field. If supplied, the color is applied to the item.

```typescript
color?: SemanticCOLORS | (data: ContentData) => SemanticCOLORS
```

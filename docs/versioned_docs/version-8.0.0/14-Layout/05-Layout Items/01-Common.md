Most layout items have the following properties:

## weight
Larger numbers move the item farther to the left or down.

```typescript
weight?: number 
```

## visible
When this is a function, it receives the current Data. If you return true from this function the item is visible.
If you return false, the item is hidden.

When this is an object, it represents a mingo (see npm 'mingo' package) query that is matched against the current Data.
If the mingo query returns true, the item is visible, otherwise the item is hidden.

```typescript
visible?: Object | (data: Data) => boolean
```

## stateSelectorHook
Pass a state select hook (or array of hooks) that return data, usually from Redux state.

This state data is added to the Data object.

```typescript
stateSelectorHook?: () => State | (() => State)[]
```

## text
Usually required (except for custom layout items). Either a static string or a function that returns a string.
The text is displayed as the items main text.

```typescript
text: string | (data: Data) => string
```

## icon
Similar to the `text` field. If supplied, the icon is shown on the item.

```typescript
icon?: SemanticICONS | (data: Data) => SemanticICONS
```

## moveToKey
If you would like to have this item moved to a child of a different item (dropdown or submenu), usually from a different
feature, enter the target item's key string here. Note, items do not have keys unless expressly defined.

The item will be removed from its current location and rendered in the target item's children.

```typescript
moveToKey?: string
```

Menu layout items will create a submenu inside the normal menu. See Semantic UI as to how these work. Submenu items aren't hidden
behind a click, like a dropdown, but grouped together. You cannot include dropdown or submenu items as children.

## menu
These items are rendered as the children of the menu.

```typescript
menu: LayoutItems[]
```

## key
Menu items can be used as a target for other items. See `moveToKey` in Common.

```typescript
`key: string`
```

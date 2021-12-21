If the item isn't a dropdown, menu or custom the item can be used to link to a route.

## to
Will render the item as a link to a route. Also used to determine if this item's route is active.

```typescript
to?: string | (data: Data) => string
```

## exact
Used to determine if the item's route is active. See React Router route props. Default is false.

```typescript
exact?: boolean
```

## strict
Used to determine if the item's route is active. See React Router route props. Default is false.

```typescript
strict?: boolean
```

## sensitive
Used to determine if the item's route is active. See React Router route props. Default is false.

```typescript
sensitive?: boolean
```

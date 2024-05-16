# permission_url `POST`

Checks if the authenticated user has the passed in permissions.

Server: Expects an `authorization` field on context.
If not found, returns all permissions as false.

### Post Body
```
{
permissions: string[];
}
```

### Return Success `200`
```
{
results: boolean[]
}
```

### Return Error
```
return 500
Body does not conform to authorization info.
```

---
id: authenticationModule
title: Authentication
sidebar_label: Authentication
---

## Anatomy of the auth `services` field
```typescript
interface services {
    token: {
      recovery: string[];
      blacklist: string[];
    }
    password: {
      bcrypt: string;
    }
}
```

## Login Return Object
```typescript
interface loginReturn {
    access: string;
    refresh: string;
    auth: {
        userId: string;
        permissions: string[];
      user: {
        name: string;
        email: string;
      }
    }
}
``` 

## Anatomy of an Access Token
```typescript
interface accessToken {
    rnd: string
    id: string
    roles: string[]
    iat: number;
    exp: number;	
}
```

## Anatomy of a Refresh Token
```typescript
interface refreshToken {
    rnd: string
    id: string
    iat: number
    exp: number
}
```

This item renders a form that can be submitted.

## form
Renders the form fields needed by the form. Usually you'll render a fragment with just the form fields.

Parameters are mostly derived from TForm (see @thx/controls).

```typescript
form: ({values, handleChange, fieldError, data}) => JSX.Element | null
```

### values
Used to set the value of your inputs.

```typescript
values: Record<string, any>
```

### handleChange
Used to notify TForm about changed inputs.

```typescript
handleChange: (e: ChangeEvent<any>) => void
```

### fieldError
Used to determine if a field contains a validation error

```typescript
fieldError: (fieldName) => boolean
```

### data
The content data passed down from the sidebar item.

```typescript
data: Data
```

## initialValues
Initial values that will be passed to TForm. If a function, can be used to calculate from content data.

```typescript
initialValues?: Record<string, any> | (data: Data) => Record<string, any>
```

## onSubmit
Fired when the form submits.

```typescript
onSubmit?: (values: Record<string, any>, data: Data) => void
```

## validationSchema
A yup validation schema, passed directly to TForm.

```typescript
validationSchema?: any
```

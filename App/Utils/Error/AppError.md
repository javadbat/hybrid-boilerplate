# AppError

when we want to show any of the errors that is stacked using `ErrorHandler` we use `AppError`

## use

```js
import { AppError } from "./AppError";

```
```jsx
throw new AppError(err.message , { show: true });
```

## AppError parameter
| parameter | descriptipn |
|---------- |------------|
| show | (boolean) visibility of the message.default is set to false |
| detail | use can assign the error in  detail so you can have a log of the error stack |
| isServerError | (boolean) defines if the error is from the server or not |
| isValidError | (boolean) defines if the error is caused by something like user actionand not the server |



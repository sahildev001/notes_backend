
# Notes Backend

- Create a `.env` file at the root and define the following variables:
  - `PORT`: Port number for the server
  - `MONGO_URL`: MongoDB connection URL
  - `SECRET_KEY`: Secret key for JWT token

  To check the running port, use the command:
  ```
  lsof -i:<PORT>
  ```

Run the code:
```
npm start
```

## SignUp
```http
POST: localhost:3000/users/signup
Body: {
  'username': String,
  'email': String,
  'password': String
}
```

## SignIn
```http
POST: localhost:3000/users/signin
Body: {
  'email': String,
  'password': String
}
```

## Create Note
```http
POST: localhost:3000/notes/
Headers: {
  Authorization: Bearer <JWT Token>
}
Body: {
  'title': String,
  'description': String
}
```

## Get Notes
```http
GET: localhost:3000/notes/
Headers: {
  Authorization: Bearer <JWT Token>
}
```

## Get Note Using ID
```http
GET: localhost:3000/notes/{noteId}
Headers: {
  Authorization: Bearer <JWT Token>
}
```

## Update Note
```http
PUT: localhost:3000/notes/{noteId}
Headers: {
  Authorization: Bearer <JWT Token>
}
Body: {
  'title': String,
  'description': String
}
```

## Delete Note
```http
DELETE: localhost:3000/notes/{noteId}
Headers: {
  Authorization: Bearer <JWT Token>
}
```

Note: Adjust the capitalization of HTTP methods for consistency and clarity. Use `POST`, `GET`, `PUT`, and `DELETE` in uppercase.

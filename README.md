# JWT API Template

Server-side CRUD API protected with [JSON Web Tokens](https://www.npmjs.com/package/jsonwebtoken) and [Bcrypt](https://www.npmjs.com/package/bcryptjs) for authentication and authorization. User and content data is stored in a [SQLite3](https://www.npmjs.com/package/sqlite3) database.

## Installation

1. Install packages.
2. Create a .env file with a variable called SECRET key and a value.
2. Install SQLite3.
3. Run `npm start`.

### Activity

#### Register

```
curl -X POST \
  http://0.0.0.0:8080/register \
  -d username=John%20Doe \
  -d email=johndoe@email.com \
  -d password=secret
```

#### Login

```
curl -X POST \
  http://0.0.0.0:8080/login \
  -d email=johndoe@email.com \
  -d password=secret 
```
  

#### Get all books

```
GET /books
```

***Example***:

```
curl -X GET \
  https://0.0.0.0:8080/books \
  -H 'x-access-token: <TOKEN>'
```

#### Add a new book

```
POST /books/
```

***Example***:

```
curl -X POST \
http://0.0.0.0:8080/books \
-H 'x-access-token: <TOKEN>' \
-d 'title=<TITLE>&genre=<GENRE>&author=<AUTHOR>'
```

#### Update existing book

```
PUT /books/:bookID
```
***Example***:

```
curl -v -X PUT \ 
http://0.0.0.0:8080/books/<BOOK ID> \
-H 'x-access-token: <TOKEN>' \
-d 'title=<TITLE>&genre=<GENRE>&author=<AUTHOR>'
```

#### Delete a book by id

```
DELETE /books/:bookID
```

***Example***:

```
curl -v -X DELETE \
-H 'x-access-token: <TOKEN>' \
http://0.0.0.0:8080/books/<BOOK ID>
```
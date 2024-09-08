### Recr task

### Setup

Install dependency and run mysql DB is required, so follow next steps to run application:

1. git clone
2. open the cloned repo and execute command `yarn install`
3. run docker compose to deploy MySql on local machine, `docker compose up -d`
4. `yarn start` should run application 


### Tests

I've made a couple tests of **Auth** service, to run tests just execute `yarn test`

### Let's play with endpoints

#### Register (create a new user)

```curl
curl --location 'localhost:3000/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "demo",
    "lastName": "demo",
    "email": "demo@demo.pl",
    "password": "demo"
}'
```
```json
Reponse

{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW9AZGVtby5wbCIsInN1YiI6MiwiaWF0IjoxNzI1ODI1NDI4LCJleHAiOjE3MjU4MjkwMjh9.roBy_-fKOeUGQ_d5efxB2H5pVZ-12fVuNnJLEZ5rmrY"
}

```

___

#### Login

```curl
curl --location 'localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "demo@demo.pl",
    "password": "demo"
}'
```

```json
Response

{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW9AZGVtby5wbCIsInN1YiI6MiwiaWF0IjoxNzI1ODI1NDI4LCJleHAiOjE3MjU4MjkwMjh9.roBy_-fKOeUGQ_d5efxB2H5pVZ-12fVuNnJLEZ5rmrY"
}
```

#### Get user by ID

```curl
curl --location 'localhost:3000/user/1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW9AZGVtby5wbCIsInN1YiI6MiwiaWF0IjoxNzI1ODI1NDI4LCJleHAiOjE3MjU4MjkwMjh9.roBy_-fKOeUGQ_d5efxB2H5pVZ-12fVuNnJLEZ5rmrY' \
--data ''
```

```json
Response

{
    "id": 1,
    "firstName": "demo",
    "lastName": "demo",
    "email": "demo@demo.pl",
    "password": "demo",
    "createdAt": "2024-09-08T19:50:49.000Z",
    "updatedAt": "2024-09-08T19:50:49.000Z"
}
```


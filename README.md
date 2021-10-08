## Nest Microservices

This is a simple example of microservices in [Nest](https://nestjs.com/) with Kafka. Both are designed as [Hybrid applications](https://docs.nestjs.com/faq/hybrid-application) i.e. listen to HTTP requests and make use of connected microservices.

We have two services:

- User Service
- Registration Service

The example demonstrates the following flow:

1. User is created in the User Service with a name and age.

This can be done via Postman with a POST request to `http://localhost:3000/api/users` and a JSON body including name and age.

```js
{
    "name": "Goku",
    "age": 88
}
```

2. The event `user.registration.pending` is emitted with the user data.
3. Registration Service listens to the `user.registration.pending` event and handles the user data.
4. User's age is assessed. If the user is 18 or over, the registration status is `approved`. Otherwise, the status is `rejected`. Note: the age chosen and this assessment is arbitrary
5. A registration is created and the registration ID and status is emitted with the event `user.registration.fulfilled`.
6. The User Service listens to the `user.registration.fulfilled` event and updates the user's registration status in the database.

## Installation

```bash

# user-service folder and registration-service folder

npm install

```

## Environmental Variables

```bash
# Create .env files using the .env.example files as a template

# Make sure the POSTGRES_USER, POSTGRES_PASSWORD AND POSTGRES_DB is the same across all three .env files
# If you are running Postgres locally, comment out the postgres-db service in the docker-compose.yml file

# root
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

# user-service folder
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=5432
POSTGRES_HOST=localhost

# registration-service folder
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=5432
POSTGRES_HOST=localhost

```

## Running the app

```bash

# To run Postgres, Kafka and Zooper

# root

docker-compose up

# user-service

npm run start:dev

# registration-service

npm run start:dev

```

## Stopping docker containers

```bash

docker-compose down

```

## Known Issues

Sometimes when starting the docker containers, the Kafka and Zookeeper services terminate referencing the error: `Error:KeeperErrorCode = NodeExists`. This prevents the user and registration services from connecting to Kafka. I would appreciate any help to fix this.

Alternatively, you can run Kafka and Zookeeper locally following the instructions from the [Kafka Quickstart Guide](https://kafka.apache.org/quickstart).

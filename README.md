## Description

This is an example of basic NestJS application, using TypeORM, Swagger, class-validator and class-transformed libraries

## Project setup

```bash
$ pnpm install
```
Using example.env create .env file with your config data

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Run locally

### run migrations
Fill the database yourself
```bash
pnpm migration:run

```
### revert migrations
```bash
pnpm migration:revert
```
## Swagger access
Visit the [Swagger site](http://localhost:3000/api#/) to investigate api endpoints.
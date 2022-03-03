## Description

A backend application in nestJS that:
- has Endpoint to register the user
- has Endpoint to log the user in
- returns JWT token upon successful login

### Notes

- User info needs to be stored in a MongoDB
- Password needs to be hash before stored

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## the Client Web App

[A webapp client](https://github.com/bortch/webapp_portfolio) 
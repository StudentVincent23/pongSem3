# Backend for pongSem3

This is the backend for the pongSem3 game. It's developed with TypeScript and uses Prisma for database operations.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your machine. You can download them from [here](https://nodejs.org/en/download/).

### Installation

1. Navigate to the backend directory: `cd backend`
2. Install the dependencies: `npm install`

## Running the Application

To start the application, run the following command:

```sh
npx ts-node controller.ts
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Accessing the Database
To access and interact with the database, run the following command:

```sh
npx prisma studio
```

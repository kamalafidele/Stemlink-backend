# StemLink

Minimal, production-ready Node.js backend for the StemLink project.

## Overview
StemLink is a Node.js API server managed with npm. The project exposes a REST API and ships automatically generated Swagger/OpenAPI documentation.

## Prerequisites
- Node.js (18+ recommended)
- npm

## Installation
1. Clone the repository
2. Install dependencies
    ```
    npm install
    ```

## Environment
Create a `.env` file at project root. Typical variables are defined in .env.example:
```
PORT=8080
MONGODB_URI=mongodb://localhost:27017/stemlink
JWT_SECRET_KEY=SOME_SECRET
```
Adjust to your environment.

## Available scripts
- `npm run start` — start the server (production).
- `npm run dev` — start the server in development with hot reload (if configured).
- `npm test` — run tests.
- `npm doc` — generate the Swagger/OpenAPI documentation.

Note: Check `package.json` for actual script implementations and adjust commands as needed.

## Generating API documentation
To build the Swagger/OpenAPI docs for the API:
```
npm run docs
```
This command generates the documentation according to the project configuration. See `package.json` and your docs config for the output location (commonly `./docs` or `./swagger`).

## Usage
1. Start the server:
    ```
    npm start
    ```
2. Open the generated API docs (if served) or view the files produced by `npm docs`.

## Testing
Run the test suite:
```
npm test
```

## Contributing
- Fork the repo, create a branch, open a PR.
- Keep changes small and focused. Add/update tests for new behavior.
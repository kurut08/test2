[![codecov](https://codecov.io/gh/kurut08/os-status-backend/graph/badge.svg?token=U2KRYU8BB9)](https://codecov.io/gh/kurut08/os-status-backend)

# What is OS Status Backend?
It's a small application exposing couple endpoints letting you get some info about the machine it's running on.
It was made for my private project, and it's intended to be run in docker container but can also be run in a terminal.

## Requirements
- Node.js 18 or newer

## How to run it?
### Locally
If you're launching the application for the first time, simply open a terminal in the root folder and run `npm quickstart`.
Every subsequent launch can be done using `npm start`.

### In a Docker
Run a docker-compose file using `docker compose up --detach`.

## How to turn it off?
### Locally
Press `CTRL + C` in the terminal window you used to start the application. Alternatively you can just close that window
completely.

### Docker
If you're using Docker Desktop, simply click the stop button next to the container.

If you're using only the Docker Engine, run `docker stop os-status-backend`. This command may require sudo permissions.

## About
### Dependencies
Dependencies are: 
- cors 
- express.

Dev dependencies are:
- @types/cors
- @types/express
- @types/jest
- @types/node
- @types/supertest
- jest
- supertest
- ts-jest
- typescript

### Port
By default, the application is using port 3005. It can be changed at
line 3 of main.ts, line 14 of Dockerfile and line 10 of docker-compose.yml.

### Base image
Image used as a base is node:22.14-alpine3.21.

### What endpoints are available in this application?
- /architecture -  returns machine type (arm64, x86_64 etc.),
- /cpu-count - returns number of cores in the CPU,
- /cpu-usage - returns usage of entire cpu as a percentage.
- /cpu-core-usage/:id - returns usage of specified cpu core as percentage,
- /disk-free - returns free disk space as bytes. Checks of C drive on Windows
  and / path on Unix,
- /disk-total - returns disk size as bytes,
- /disk-usage - returns used disk space as bytes,
- /disk-usage-percentage - returns used disk space as percentage,
- /ram-free - returns free RAM memory as bytes,
- /ram-total - returns total RAM memory size as bytes,
- /ram-usage - returns used RAM memory as bytes,
- /ram-usage-percentage - returns used RAM memory as percentage,
- /os - returns OS type,
- /os-uptime - returns system uptime in seconds.

# License
[MIT License](https://opensource.org/license/mit)
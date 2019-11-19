FROM node:12 AS builder

RUN mkdir -p /usr/app
WORKDIR /usr/app

## Install dependencies
COPY ["./package.json", "./package-lock.json", "/usr/app/"]

RUN npm install

## Add source code
COPY "./src" "/usr/app/src/"

## Build
RUN npm run build

# PRODUCTION IMAGE

FROM node:12-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY --from=builder [\
  "/usr/app/package.json", \
  "/usr/app/package-lock.json", \
  "/usr/app/" \
  ]

COPY --from=builder "/usr/app/dist" "/usr/app/dist"

RUN npm install --only=prod
ENTRYPOINT [ "npm", "start" ]

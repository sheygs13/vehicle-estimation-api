#!/bin/sh

FROM node:16-bullseye-slim
RUN  apt-get update; \
    apt-get install -y python3; \
    apt-get install -y python2 make; \
    apt-get install -y g++; \
    ln -s /usr/bin/python2.7 /usr/bin/python;


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

EXPOSE 8282
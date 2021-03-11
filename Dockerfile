FROM node:alpine

RUN mkdir app/
COPY . app/

WORKDIR app

EXPOSE 3000

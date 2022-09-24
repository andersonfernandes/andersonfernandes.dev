---
title: Dockerizing a Rails app
description: Step-by-step on how to get a rails application running on Docker
date: '2021-03-07'
updated: '2022-05-26'
---

Docker is a container solution developed by the [Docker Inc](https://www.docker.com/) and backed by the [open source community](https://forums.docker.com/). The idea of the docker solution is to provide a [container based tool](https://www.redhat.com/pt-br/topics/containers/whats-a-linux-container) with an image-based deployment model. You can create a complete development/production ready environment with a simple set of configuration and wrap it into an image that can be distributed on your team or to the community.

In this article we are going to build the configuration of a development environment to a simple rails application using a PostgreSQL database.

## Configuration steps

First you need some application to work on created and [Docker](https://docs.docker.com/engine/install/)/[Compose](https://docs.docker.com/compose/install/) installed.

Create the following files at the project root.

### Dockerfile

The Dockerfile configures the image with all dependencies of the project.

```dockerfile
ARG RUBY_VERSION=3.1.2

FROM ruby:$RUBY_VERSION-alpine

RUN apk add --update --no-cache \
  bash \
  build-base \
  sudo \
  libpq-dev \
  tzdata

RUN mkdir -p /app
WORKDIR /app

RUN gem install bundler
```

The **FROM** statement defines the base image of our container which is the alpine version of the official ruby image of the 3.1.2 version of the language.
We are also installing the dependecies to run the application and preparing the system to receive the code.

### docker-compose.yml

The compose file configures the services of the application using a YAML syntax.

```yaml
services:
  db:
    image: postgres:13
    environment:
      - POSTGRES_HOST_AUTH_METHOD=trust
    volumes:
      - postgres:/var/lib/postgresql/data
  web:
    build:
      context: ./
      args:
        - RUBY_VERSION=3.1.2
    environment:
      - DATABASE_USERNAME=postgres
      - DATABASE_PASSWORD=
      - DATABASE_HOST=db
      - DATABASE_PORT=5432
    depends_on:
      - db
    entrypoint: ./entrypoint.sh
    ports:
      - 5000:3000
    volumes:
      - .:/app:cached
    tty: true
    stdin_open: true

volumes:
    postgres:
```

With this config file we are defining two services:

- The database service, using the version 13 of PostgreSQL and with a [volume](https://docs.docker.com/storage/volumes/) mounted storing the database data.
- The application service thats going to use our previouslly created Dockerfile to build its container. Here we can define some parameters of the application run:
  - The environment variables with the `environment` key.
  - The ports binding from the host machine with the container.
  - The entrypoint script, which will bootstrap the application during the services startup.

### entrypoint.sh

Here we just install all rails/node dependencies, configure the database and start the application server process.

```bash
#! /bin/bash
set -e

bundle install

[ -e tmp/pids/server.pid ] && rm tmp/pids/server.pid

bundle exec rails db:prepare
bundle exec rails server -p 3000 -b 0.0.0.0
```

### Adding new dependencies

At this point the application is configured to run the rails server connected to a PostgreSQL database.
If you need more dependencies, such Redis, ElasticSearch or MongoDB you can simply add a new service that uses an image that wraps the depedency.

The [Docker Hub](https://hub.docker.com) platform is a public respository used by many companies and individual developers to share Docker images. You can use it to search the service you need to attach to your application.

### Wrapping up and running the application

To run the application you can use the following commands:

- `docker compose up` will raise all services described on the compose file.
- `docker compose exec SERVICE_NAME COMMAND` will run the given command on the command line of the indicated service.
- `docker compose down` is going to stop all services.

Now you have a fully functional and ready to use configuration to your project. I used a Ruby on Rails application as example, but the concepts can be applied to any stack you use, you just need to adjust the Dockerfile to your project dependencies and configure the services on the compose file.


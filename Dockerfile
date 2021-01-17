FROM node:alpine

RUN mkdir app/
COPY . app/

WORKDIR app

RUN yarn install
RUN yarn build

EXPOSE 3000
ENTRYPOINT ["yarn", "start"]

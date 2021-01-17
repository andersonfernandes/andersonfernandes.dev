FROM alpine

RUN apk add --update nodejs npm
RUN npm install --global yarn

RUN mkdir app/
COPY . app/

WORKDIR app

RUN yarn install
RUN yarn build

ENTRYPOINT ["yarn", "start"]

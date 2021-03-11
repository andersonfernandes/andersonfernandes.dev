FROM node:alpine

RUN mkdir app/
COPY . app/

WORKDIR app

RUN echo "NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}" >> .env.production

RUN yarn install
RUN yarn build

EXPOSE 3000
ENTRYPOINT ["yarn", "start"]

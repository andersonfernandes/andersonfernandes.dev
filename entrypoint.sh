#! /bin/bash
set -e

echo "NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}" >> .env.production

yarn install
yarn build
yarn start

FROM node:20-alpine

WORKDIR /app

EXPOSE 3000

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

EXPOSE 3000

CMD ["yarn", "dev"]
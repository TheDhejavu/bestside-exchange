# pull the base image
FROM node:alpine3.14

WORKDIR /usr/src/app

COPY package.json .

COPY package-lock.json .

RUN npm install --silent

COPY . ./

EXPOSE 3000

CMD [ "npm", "start" ]
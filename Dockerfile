FROM node:20.16.0-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

CMD ["npm", "start"]
FROM node:18-alpine

COPY package*.json App/
COPY dist/ App/

WORKDIR /App

RUN npm install

CMD ["node", "main"]
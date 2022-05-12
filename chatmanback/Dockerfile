FROM node:18-alpine
COPY dist/ App/
WORKDIR /App

COPY package*.json ./
RUN npm install --only=production

CMD ["node", "main"]
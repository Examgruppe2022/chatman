FROM node:18alpine
COPY dist/ App/
WORKDIR /App

COPY package*.json ./
RUN npm install --only=production

CMD ["node", "main"]
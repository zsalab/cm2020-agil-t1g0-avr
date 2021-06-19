FROM node:14

WORKDIR /app

COPY server.js ./
COPY public/ ./public/
COPY views/ ./views/
COPY package*.json ./

RUN npm install --only=production

EXPOSE 8080

ENV PORT=8080

CMD [ "node", "server.js" ]

FROM node:18-alpine As Development

WORKDIR /app

COPY --chown=node:node . ./

COPY package*.json ./

RUN npm ci

COPY --chown=node:node .env ./
COPY . .

CMD ["npm", "run","start:dev"]

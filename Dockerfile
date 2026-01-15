# State 1: Build Typescript
FROM node:22-slim AS builder

WORKDIR /usr/app

COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Run with PM2
FROM keymetrics/pm2:18-alpine

COPY src src/
COPY package.json .
COPY pm2.json .
COPY --from=builder /usr/app/dist .
RUN npm install --production

EXPOSE 3000

CMD ["pm2-runtime", "start", "pm2.json"]

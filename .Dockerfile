FROM node:20-alpine AS stage

WORKDIR /usr/src/app

COPY package*.json .

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:20-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.*json  .

COPY --from=stage /usr/src/app/dist ./dist

CMD ["node", "dist/server.js"]
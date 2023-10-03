FROM node:alpine AS base

RUN npm i -g pnpm



FROM base AS dependencies

WORKDIR /user/app/
COPY package.json pnpm-lock.yaml ./

RUN pnpm install



FROM dependencies AS build

WORKDIR /user/app

COPY . .
COPY package.json pnpm-lock.yaml ./
COPY --from=dependencies /user/app/node_modules ./node_modules

RUN pnpm run build



FROM build AS production

ARG NODE_ENV=production
ARG NODE_ENV=${NODE_ENV}

WORKDIR /user/app

COPY --from=build /user/app/dist ./dist
COPY --from=build /user/app/node_modules ./node_modules

CMD [ "node", "dist/main" ]
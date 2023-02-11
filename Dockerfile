FROM node:18-alpine as deps

WORKDIR /app

RUN apk add bash dumb-init curl
RUN curl -s https://raw.githubusercontent.com/Intervox/node-webp/latest/bin/install_webp | bash
RUN apk add --no-cache --update libwebp-tools
RUN apk add --no-cache --update libpng-dev libjpeg-turbo-dev giflib-dev tiff-dev autoconf automake make gcc g++ wget
RUN wget --no-check-certificate https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.0.0.tar.gz && \
      tar -xvzf libwebp-1.0.0.tar.gz && \
      cd libwebp-1.0.0 && \
      ./configure && \
      make && \
      make install && \
      cd .. && \
      rm -rf libwebp-1.0.0 libwebp-1.0.0.tar.gz

RUN npm install --location=global pnpm

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node src ./src
COPY --chown=node:node babel.config.js ./
COPY --chown=node:node nodemon.json ./

RUN pnpm install

FROM deps as builder

USER root

RUN mkdir /app/dist
RUN chown -R node:node /app/dist

USER node

RUN pnpm build

FROM builder as prerelease

USER root

RUN rm -rf node_modules
RUN pnpm install --production --ignore-scripts

FROM node:16-alpine as prod

WORKDIR /app

RUN apk add bash dumb-init
RUN npm install -g pm2

COPY --chown=node:node package.json pnpm-lock.yaml ecosystem.config.js ./
COPY --from=prerelease --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=prerelease --chown=node:node /app/dist/ ./dist/
COPY --chown=node:node .env/ ./

USER node

ENTRYPOINT ["dumb-init", "pm2-runtime", "start", "ecosystem.config.js"]

EXPOSE 3000

FROM deps as dev

COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node tsconfig.build.json ./
COPY --chown=node:node .env ./
COPY --chown=node:node .eslintrc.js ./

# Run development server
ENTRYPOINT [ "dumb-init", "pnpm", "start:dev" ]

EXPOSE 3000

USER node

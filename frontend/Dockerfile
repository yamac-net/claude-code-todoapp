FROM cr-mirror.yamac.net/library/node:18-alpine AS base
WORKDIR /frontend
COPY package*.json ./
RUN npm ci
COPY . .

FROM base AS test
RUN npm test -- --coverage --watchAll=false

FROM base AS build-beta
RUN npm run build:beta

FROM base AS build-prod
RUN npm run build:prod

FROM cr-mirror.yamac.net/library/nginx:alpine AS package-app-beta
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-beta /frontend/build .
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'echo "Starting Nginx server on port 80..."' >> /docker-entrypoint.sh && \
    echo 'echo "Environment: Beta"' >> /docker-entrypoint.sh && \
    echo 'nginx -g "daemon off;"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

FROM cr-mirror.yamac.net/library/nginx:alpine AS package-app-prod
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-prod /frontend/build .
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'echo "Starting Nginx server on port 80..."' >> /docker-entrypoint.sh && \
    echo 'echo "Environment: Production"' >> /docker-entrypoint.sh && \
    echo 'nginx -g "daemon off;"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
FROM node:14.0.0-alpine3.11

ARG UID=1001
ARG GID=1001
ARG PROXY=''

ENV http_proxy ${PROXY}
ENV https_proxy ${PROXY}

ENV mongodb ''

COPY src /app

# Setup user
WORKDIR /app

RUN yarn && \
    addgroup -S -g ${GID} user && \
    adduser -S -u ${UID} -G user user && \
    chown user:user /app && \
    chown -R user:user /app

EXPOSE 8080

CMD node index.js

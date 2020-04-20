FROM node:13.13.0-alpine

ARG UID=9999
ARG GID=9999
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

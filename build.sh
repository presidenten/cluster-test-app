#!/bin/bash

set -e

REPO=presidenten
IMAGE_NAME=cluster-test-app
IMAGE_VERSION=1.0.0


NODE_VERSION=13.13.0-alpine
USER_UID=9999
USER_GID=9999
PROXY=

docker image build -t ${IMAGE_NAME}:${IMAGE_VERSION} \
  --build-arg NODE_VERSION=$NODE_VERSION \
  --build-arg UID=$USER_UID \
  --build-arg GID=$USER_GID \
  --build-arg PROXY=$PROXY \
  .

#docker image tag ${IMAGE_NAME}:${IMAGE_VERSION} $REPO/${IMAGE_NAME}:${IMAGE_VERSION}

docker image ls | grep ${IMAGE_NAME} | grep $IMAGE_VERSION

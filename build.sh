#!/bin/bash

set -e

REPO=presidenten
IMAGE_NAME=cluster-test-app
IMAGE_VERSION=1.0.1

USER_UID=1001
USER_GID=1001
PROXY=

docker image build -t ${IMAGE_NAME}:${IMAGE_VERSION} \
  --build-arg NODE_VERSION=$NODE_VERSION \
  --build-arg UID=$USER_UID \
  --build-arg GID=$USER_GID \
  --build-arg PROXY=$PROXY \
  .

#docker image tag ${IMAGE_NAME}:${IMAGE_VERSION} $REPO/${IMAGE_NAME}:${IMAGE_VERSION}

docker image ls | grep ${IMAGE_NAME} | grep $IMAGE_VERSION

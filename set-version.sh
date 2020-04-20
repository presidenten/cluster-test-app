#!/bin/bash

sed -r "s|(IMAGE_VERSION=).+|\1$1|" build.sh

 sed -r "s|(image: cluster-test-app:).+|\1$1|" local-test/docker-compose.yaml

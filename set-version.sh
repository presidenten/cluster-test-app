#!/bin/bash

sed -r -i "s|(IMAGE_VERSION=).+|\1$1|" build.sh

sed -r -i "s|(image: cluster-test-app:).+|\1$1|" local-test/docker-compose.yaml

sed -r -i "s|(\"version\": ).+|\1\"$1\"|" src/current-version.json

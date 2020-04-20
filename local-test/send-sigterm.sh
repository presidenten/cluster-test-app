#!/bin/bash

docker stop $(docker ps | grep cluster-test-app | grep -Po '^...') --time 360

Simple test application
=======================

Features:
---------
- websockets
- healthcheck endpoint
- tries to stay alive through SIGTERM while websocket-connections are active
- wants db-backend to also test persistant storage

Environment flags:
------------------
- `mongodb`: url to mongodb, app mocks db if `mongodb=undefined`
- `basepath`: basepath to append to all rest-endpoints
- `port`: port for internal web server

Rest endpoints:
---------------
- `<basepath>/`
  - index.html that connects to server with websocket
- `<basepath>/health`
  - reports 503 if unavailable
  - reports 200 if good to go

Local test:
-----------
- Start servers:
  ```bash
  cd test
  docker-compose up
  ```

- Connect with some browsers to http://localhost:8080/test
  - Check that `time` is being updated every second and that `Total connections so far` is being updated.

- Keep browsers open and close server with grace period to check that SIGTERM is handled correctly
  ```bash
    docker stop $(docker ps | grep cluster-test | grep -Po '^...') --time 360
  ```
  - The health check should go from `200 OK` to `503 - Unavailable` - http://localhost:8080/test/health
  - The container should report on currently active connections
  - Close each browser before the 360s timeout, and the server should shut down gracefully.

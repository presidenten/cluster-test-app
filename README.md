Cluster-test-app
================

Features:
---------
- websockets
- healthcheck endpoint
- tries to stay alive through SIGTERM while websocket-connections are active
- wants db-backend to also test persistant storage

Environment flags:
------------------
- `mongodb`: url to mongodb, app mocks db if `mongodb=undefined`
- `mongodb_user`: mongodb user
- `mongodb_password`: mongodb password
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
- Build
 ```bash
  ./build.sh
 ```

- Start servers:
  ```bash
  cd local-test
  docker-compose up
  ```

- Wait until the test container prints `DB connected`.

- Connect with some browsers to http://localhost:8080/test
  - Check that `time` is being updated every second and that `Total connections so far` is being updated.

- Keep browsers open and close server with grace period to check that SIGTERM is handled correctly
  ```bash
    ./send-sigterm.sh
  ```
  - The health check should go from `200 OK` to `503 - Unavailable` - http://localhost:8080/test/health
  - The container should report on currently active connections
  - Close each browser before the 360s timeout, and the server should shut down gracefully.
  - Close docker-compose with `ctrl + c`


Attributions:
-------------
Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>


## Environment Variables
These can be specified in a `.env` file in the server package. These variables are secret and not shared with the client.

| Variable               | Default | Description                                                                                    |
|------------------------|---------|------------------------------------------------------------------------------------------------|
| IMP_PROCESSES          | 1       | The number of worker processes to start. 0 means autodetect.                                   |
| IMP_WORKER_CRASH_DELAY | 4000    | Milliseconds to wait before restarting a worker process instead of counting towards crash max. |
| IMP_WORKER_CRASH_MAX   | 5       | Number of times a worker is allowed to crash before killing the server.                        |

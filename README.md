# IoT-task-tracking-performance-testing

This repository contains k6 performance/load testing scripts for IoT Clinical Task Trackin API.

## How to Run
Ensure you have k6 installed on your system. If not, you can install it from [here](https://k6.io/docs/getting-started/installation/).

Run the scripts by the following command in your terminal:
```
k6 run  -e BASE_API_URL=http://localhost:3000 ./src/index.js
``
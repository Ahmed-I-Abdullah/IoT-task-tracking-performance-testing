# IoT Task Tracking Performance Testing

This repository contains k6 performance/load testing scripts for IoT Clinical Task Tracking API.

## Running Locally
To run the k6 performance/load testing scripts locally without sending metrics to InfluxDB, follow these steps:

1. Ensure that you have k6 installed on your system. If not, you can install it from [here](https://k6.io/docs/getting-started/installation/).

2. Run the scripts using the following command in your terminal:
   ```
   k6 run  -e BASE_API_URL=http://localhost:3000 ./src/index.js
   ```

This command will execute the k6 scripts locally on your system without sending metrics to InfluxDB.

## Running with InfluxDB Extension
To run the k6 performance/load testing scripts with the InfluxDB extension for sending metrics to an InfluxDB instance, follow these steps:

1. Ensure that you have the custom k6 binary with the InfluxDB extension built as per the steps in the following link [InfluxDB Results Output](https://k6.io/docs/results-output/real-time/influxdb/).

2. Run the scripts with the necessary parameters (organization ID, InfluxDB bucket name, token, and InfluxDB HTTP address) using the following command in your terminal:
   ```
   K6_INFLUXDB_ORGANIZATION="<INFLUXDB-ORGANIZATION-NAME>" \
   K6_INFLUXDB_BUCKET="<INFLUXDB-BUCKET-NAME>" \
   K6_INFLUXDB_TOKEN="<INFLUXDB-TOKEN>" \
   K6_INFLUXDB_ADDR="<INFLUXDB-HTTP-ADDRESS>" \
   ./k6 run -e BASE_API_URL=http://<API_IP_ADDRESS>:3000 ./src/index.js -o xk6-influxdb
   ```

With these steps, you can choose to run the k6 testing scripts locally or with the InfluxDB extension for sending metrics to an InfluxDB instance.
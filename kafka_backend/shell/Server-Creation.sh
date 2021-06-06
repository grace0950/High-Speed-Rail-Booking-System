#!/bin/bash
source config-system.txt
${KAFKA_PATH}/bin/kafka-server-start.sh ${KAFKA_PATH}/config/server.properties
echo "Kafka Server Success!"
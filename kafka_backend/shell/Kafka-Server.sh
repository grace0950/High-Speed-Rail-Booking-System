#!/bin/bash

source config-system.txt

echo ${KAFKA_PATH}

gnome-terminal -e 'bash -c "bash Topic-Creation.sh;exec bash"'
gnome-terminal -e 'bash -c "bash Server-Creation.sh;exec bash"'
${KAFKA_PATH}/bin/kafka-topics.sh --create --topic login_topic --bootstrap-server localhost:9092
${KAFKA_PATH}/bin/kafka-topics.sh --create --topic response_topic --bootstrap-server localhost:9092
${KAFKA_PATH}/bin/kafka-topics.sh --create --topic signup_topic --bootstrap-server localhost:9092
${KAFKA_PATH}/bin/kafka-topics.sh --create --topic search_topic --bootstrap-server localhost:9092
${KAFKA_PATH}/bin/kafka-topics.sh --create --topic order_topic --bootstrap-server localhost:9092
${KAFKA_PATH}/bin/kafka-topics.sh --create --topic searchOrder_topic --bootstrap-server localhost:9092
${KAFKA_PATH}/bin/kafka-topics.sh --create --topic deleteOrder_topic --bootstrap-server localhost:9092


echo "Topic Created Success!"

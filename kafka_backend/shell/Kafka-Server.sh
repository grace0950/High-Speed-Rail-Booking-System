#!/bin/bash

source config-system.txt

echo ${KAFKA_PATH}

gnome-terminal -e 'bash -c "bash Topic-Creation.sh;exec bash"'
gnome-terminal -e 'bash -c "bash Server-Creation.sh;exec bash"'
${KAFKA_PATH}/bin/kafka-topics.sh --create --topic login_topic --bootstrap-server localhost:9092
${KAFKA_PATH}/bin/kafka-topics.sh --create --topic response_topic --bootstrap-server localhost:9092
${KAFKA_PATH}/bin/kafka-topics.sh --create --topic signup_topic --bootstrap-server localhost:9092
#${KAFKA_PATH}/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic login_topic
#${KAFKA_PATH}/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic
#${KAFKA_PATH}/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic signup_topic


echo "Topic Created Success!"
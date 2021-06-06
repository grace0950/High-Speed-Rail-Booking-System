#!/bin/bash

# Your local kafka location
KAFKA=/home/absnormal/大學/DS_2021/kafka_2.13-2.8.0/

cd ${KAFKA}

if [ $? -eq 0 ]; then
    echo "Local Kafka Found"
    pwd
else
    echo "Local Kafka Not Found"
    echo "Change local Kafka location in the script"
    exit
fi

trap "kill -9 0" EXIT

# Server Creation
bin/zookeeper-server-start.sh config/zookeeper.properties &
ZOOKEEPER_PID=$!
echo $ZOOKEEPER_PID
bin/kafka-server-start.sh config/server.properties &
KAFKA_PID=$!
echo $KAFKA_PID

# This is the shell file that create the kafka topic
# first, given where you install kafka, there should be a bin folder include zookeeper-server-start.sh, kafka-server-start.sh
# And given two config file in the config folder..
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic login_topic 2>&1
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic 2>&1
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic signup_topic 2>&1

if [ $? -eq 0 ]; then
    echo "Topic Create Success"
else
    exit
fi

wait

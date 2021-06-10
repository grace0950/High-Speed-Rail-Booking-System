#!/bin/bash

# Your local kafka location
KAFKA=/home/absnormal/大學/DS_2021/kafka_2.13-2.8.0/

# kafka topic names
TOPIC1=login_topic
TOPIC2=response_topic
TOPIC3=signup_topic

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

if [ $? -eq 0 ]; then
    echo "Topic ${TOPIC1} Success"
else
    echo "Topic ${TOPIC1} Fail"
    exit
fi

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic $TOPIC2 2>&1

if [ $? -eq 0 ]; then
    echo "Topic $TOPIC2 Success"
else
    exit
fi

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic $TOPIC3 2>&1

if [ $? -eq 0 ]; then
    echo "Topic $TOPIC3 Success"
else
    exit
fi

wait

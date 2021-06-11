#!/bin/bash

# Your local kafka location
KAFKA=/home/pinyan/Kafka/kafka_2.13-2.8.0/

# Go to local kafka
cd $KAFKA

if [ $? -eq 0 ]; then
    echo "Local Kafka Found"
else
    echo "Local Kafka Not Found"
    echo "Change local Kafka location in the script"
    exit
fi

# remove kafka topics
rm -rf /tmp/kafka-logs /tmp/zookeeper

if [ $? -eq 0 ]; then
    echo "Topic Logs Removed"
else
    exit
fi

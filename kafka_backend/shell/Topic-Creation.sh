#!/bin/bash
#This is the shell file that create the kafka topic

#first, given where you install kafka, there should be a bin folder include zookeeper-server-start.sh, kafka-server-start.sh
#And given two config file in the config folder..
source config-system.txt
echo ${KAFKA_PATH}
${KAFKA_PATH}/bin/zookeeper-server-start.sh ${KAFKA_PATH}/config/zookeeper.properties

echo "Zookeeper Server Success!"

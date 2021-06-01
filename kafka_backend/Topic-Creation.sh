#This is the shell file that create the kafka topic

#first, given where you install kafka, there should be a bin folder include zookeeper-server-start.sh, kafka-server-start.sh
#And given two config file in the config folder..
cd "~/Kafka/kafka_2.13-2.8.0"
bin/zookeeper-server-start.sh config/zookeeper.properties
bin/kafka-server-start.sh config/server.properties

bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic login_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic signup_topic

echo "Topic Create Success!"

/root/kafkabox/kafka_2.12-2.3.0/bin/zookeeper-server-start.sh /root/kafkabox/kafka_2.12-2.3.0/config/zookeeper.properties &

sleep 10s

/root/kafkabox/kafka_2.12-2.3.0/bin/kafka-server-start.sh /root/kafkabox/kafka_2.12-2.3.0/config/server.properties &

sleep 10s

/root/kafkabox/kafka_2.12-2.3.0/bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic test-topic

sleep 10s

bash
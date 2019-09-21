FROM centos:latest

RUN mkdir /root/kafkabox

COPY kafka_2.12-2.3.0.tgz /root/kafkabox/

COPY start-kafka-server.sh /root/kafkabox/

RUN tar -xzf /root/kafkabox/kafka_2.12-2.3.0.tgz -C /root/kafkabox/

RUN yum -y install java

ENTRYPOINT ["sh", "/root/kafkabox/start-kafka-server.sh"]

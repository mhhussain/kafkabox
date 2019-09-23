FROM centos:latest

# Create high-level app directory
RUN mkdir /root/kafkabox &&\
    mkdir /root/kafkabox/kafka-api

# Copy in Kafka
COPY kafka_2.12-2.3.0.tgz /root/kafkabox/

COPY start-kafka-server.sh /root/kafkabox/

# Copy in node backend
COPY kafka-api /root/kafkabox/kafka-api

# Extract Kafka
RUN tar -xzf /root/kafkabox/kafka_2.12-2.3.0.tgz -C /root/kafkabox/

# Install java
RUN yum install -y java

# Install node
RUN yum install -y gcc-c++ make &&\
    curl -sL https://rpm.nodesource.com/setup_10.x | bash - &&\
    yum install -y nodejs

RUN npm --prefix /root/kafkabox/kafka-api install /root/kafkabox/kafka-api

ENTRYPOINT ["sh", "/root/kafkabox/start-kafka-server.sh"]

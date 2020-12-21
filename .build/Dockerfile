FROM centos:latest

# Create high-level app directory
RUN mkdir /root/kafkabox &&\
    mkdir /root/kafkabox/app

# Copy in Kafka
COPY kafka_2.12-2.3.0.tgz /root/kafkabox/

# Copy in API and frontend site
COPY kafkabox/api /root/kafkabox/app

# Extract Kafka
RUN tar -xzf /root/kafkabox/kafka_2.12-2.3.0.tgz -C /root/kafkabox/

# Install java
RUN yum install -y java

# Install node
RUN yum install -y gcc-c++ make &&\
    curl -sL https://rpm.nodesource.com/setup_10.x | bash - &&\
    yum install -y nodejs

# Copy in start script
COPY start-kafka-server.sh /root/kafkabox/

ENTRYPOINT ["sh", "/root/kafkabox/start-kafka-server.sh"]

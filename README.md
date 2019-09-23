# Kafkabox - Kafka Sandbox
Sandbox Kafka - single broker and zookeeper

## Purpose

I had a lot of trouble prototyping with Kafka because I could not find a Kafka cluster setup that simply spun up a cluster and topic for quick coding.

This codebase is mainly a Docker image which, when run, will give you a very quick and dirty local Kafka topic to produce and consume to. This helped me focus on coding the solution first, and then figure out the details of my cluster setup later. I needed this because I do a lot of PoC's. Might help you too.

## Running the sandbox

The main image can be found here: https://cloud.docker.com/repository/docker/moohh/kafkabox

To run the sandbox, pull and run the image:

```
docker pull moohh/kafkabox

docker run -t --name kafkabox -p 9092:9092 moohh/kafkabox
```

Once the sandbox is running, you should be able to implement a Kafka publisher and consumer with a broker address of localhost:9092.

## Building from source

To build the image run:

`
docker build .
`

## Details

Currently, this is setup to do the following.

When the docker image is created:
1. Pull the latest centos image
2. Copy the Kafka binaries (downloaded from Apache Kafka) into the image
3. Unzip the Kafka binaries in the container
4. Copy a shell script to start the Kafka server

When the image is run:
`docker run -t --name container -p 9092:9092 moohh/kafkabox`
1. Run a basic zookeeper instance on port 2181  as a process in the image
2. Run a basic broker instance on port 9092 as a process in the image
3. Create a new topic called 'sandbox-topic'

Port 9092 of the image is forwarded to localhost making the Kafka broker available via host port 9092.

## Known issues

For some reason, docker container names aren't being resolved by the DNS? Not sure why, still looking into this. In the meantime, adding the container name to our hosts file worked for me.

Get container name:

`docker ps`

Update hosts file at: `/etc/hosts` and have the container name point to 127.0.0.1


### Version

- 1.0.0 - Working version of kafkabox docker image
- 1.0.1 - Changed test-topic name to sandbox-topic
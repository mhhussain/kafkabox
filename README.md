# Kafkabox - Kafka Sandbox
Sandbox Kafka - single broker and zookeeper, and a nice little API as well.

## Purpose

I had a lot of trouble prototyping with Kafka because I could not find a Kafka cluster setup that simply spun up a cluster and topic for quick coding.

This codebase is mainly a Docker image which, when run, will give you a very quick and dirty local Kafka topic to produce and consume to. This helped me focus on coding the solution first, and then figure out the details of my cluster setup later. I needed this because I do a lot of PoC's. Might help you too.

_Update 2.0.0_
Added a backend API (currently in node) at port 3001. Export port 3001 when creating the docker container for access.

_Update 3.0.0_
Moved the entire API from using `kafka-node` to `kafkajs`. New routes are at `/api/v2`. Websockets are now also available, see `index.html` for an example.

## Running the sandbox

The main image can be found here: https://hub.docker.com/r/moohh/kafkabox

To run the sandbox pull and run the image:

```
docker run -t --name kafkabox -p 9092:9092 -p 3001:3001 moohh/kafkabox
```

Once the sandbox is running, you should be able to implement a Kafka publisher and consumer with a broker address of localhost:9092. Backend API is also available at port 3001.

## Version

- 1.0.0 - Working version of kafkabox docker image
- 1.0.1 - Changed test-topic name to sandbox-topic
- 2.0.0 - Added (node) backend api at port 3001
- 2.1.0 - Added get topics endpoint and some error handling
- 2.2.0 - Added a producer to send messages to topics in the sandbox
- 2.3.0 - Added consumer - get all messages and get message by offset
- 3.0.0 - Migrated API to kafkajs and also added real-time streaming over socket via feathersjs
- 3.1.0 - Added a way to create a consumer on any topic

## Kafka API

An API is included with the sandbox running on port 3001.

Current list of endpoints:

|End point|Type|Level|Details|
|---|---|---|---|
|_/api/v2/topics_|GET|V2|Get list of topics in sandbox|
|_/api/v2/:topic/create_|POST|V2|Create topic, must include `topicName` in `body` of request|
|_/api/v2/:topic/send_|POST|V2|Adds a message to a topic, must include `message` and `topic` in `body` of request|
|_/api/v2/:topic/feathers_|POST|V2|Starts a consumer to the messages feathers service, messages for the topic are avaible at feather socket. See below for details|
|_/messages_|GET|V1|Get all messages in sandbox. This is using feathersjs, see below for details|
|_/topics_|GET|DEP|Get list of topics in sandbox|
|_/:topic/create_|POST|DEP|Create topic, must include `topicName` in `body` of request|
|_/:topic/send_|POST|DEP|Adds a message to a topic, must include `message` and `topic` in `body` of request|
|_/:topic_|GET|DEP|Gets all messages from `:topic`|
|_/:topic/:offset_|GET|DEP|Gets message from `:topic` with offset `:offset`|

All endpoints listed as DEP are endpoints written in the `kafka-node` library. V2 endpoints are using `kafkajs`.

## Feathers JS

Visit `localhost:3001` for a sample of realtime behavior.

Featherjs is being used to stream and save data in the API for websocket connections. Socket is available at `localhost:3001`, front-end socket can be implemented by called `app.service('message').on('created', cbFunction)`. See `index.html` for an example of how this works.

The application does not automatically consume from any topics. To start a realtime stream from a topic, use the `/api/v2/:topic/feathers` endpoint mentioned above. Consumer group id is `${topicName}-socket-group` (i.e. `sandbox-topic-socket-group`).

The endpoint `/messages` returns an array with all messages in the sandbox.

## Building from source

To build the image run:

`docker build .`

### Build and run details

This is the current process in my mind.

When the docker image is created:
1. Pull the latest centos image
2. Create directories for source
3. Copy the Kafka binaries (downloaded from Apache Kafka) into the image
4. Copy kafka-api code
5. Unzip the Kafka binaries in the container
6. Install java (I could probably use a java container...)
7. Install node
8. Run npm install to pull node modules
9. Copy server start file

When the image is run:
`docker run -t --name container -p 9092:9092 -p 3001:3001 moohh/kafkabox`
1. Run a basic zookeeper instance on port 2181  as a process in the image
2. Run a basic broker instance on port 9092 as a process in the image
3. Create a new topic called 'sandbox-topic'
4. Start the kafka-api (npm start) on port 3001

Port 9092 of the container is forwarded to localhost making the Kafka broker available via host port 9092. Port 3001 of the container is forwarded to localhost for access to the API.

## Known issues

For some reason, docker container names aren't being resolved by the DNS? Not sure why, still looking into this. In the meantime, adding the container name to our hosts file worked for me.

Get container name:

`docker ps`

Update hosts file at: `/etc/hosts` and have the container name point to 127.0.0.1

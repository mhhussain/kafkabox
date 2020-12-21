rm -rf ./sandbox

mkdir sandbox
cp Dockerfile ./sandbox/Dockerfile
cp .dockerignore ./sandbox/.dockerignore
cp kafka_2.12-2.3.0.tgz ./sandbox/kafka_2.12-2.3.0.tgz
cp start-kafka-server.sh ./sandbox/start-kafka-server.sh

cd ./sandbox

git clone --single-branch --branch develop git@github.com:mhhussain/kafkabox.git

cd ./kafkabox
cd ./api
yarn install

cd ../ui
yarn install

yarn run build

cd ../..

docker build -t moohh/kafkabox:5.0.1-alpha .
docker push moohh/kafkabox:5.0.1-alpha

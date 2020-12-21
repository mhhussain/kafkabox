rm -rf ./sandbox

mkdir sandbox
cp Dockerfile ./sandbox/Dockerfile
cp start-kafka-server.sh ./sandbox/start-kafka-server.sh
cd ./sandbox

#git clone
cd ./kafkabox
cd ./api
yarn install
cd ../ui
yarn install
yarn run build

cd ..

docker build -t moohh/kafkabox:5.0.1-alpha .
docker push moohh/kafkabox:5.0.1-alpha

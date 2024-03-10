#!/bin/bash

docker compose up -d
cd backend
mvn clean install
mvn spring-boot:run &

cd ../frontend
yarn start &
#!/bin/bash

docker compose up -d
cd frontend
cd ../backend
mvn clean install
mvn spring-boot:run &
yarn start &
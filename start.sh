#!/bin/bash

docker compose up -d
cd react-frontend
cd ../netflixCloneSpringBackend
mvn clean install
mvn spring-boot:run &
yarn start &
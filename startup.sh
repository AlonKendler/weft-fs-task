#!/bin/bash

echo "Pulling latest changes"
git pull

echo "Installing dependencies"
npm install

echo "Building application"
npm run build

echo "Creating DB"
docker compose up --detach

echo "Starting server"
npm run start
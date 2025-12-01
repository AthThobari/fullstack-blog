#!/bin/bash


echo "Pulling latest changes.."
git pull origin main


echo "Cleaning old containers and image"

# kill and delete unused container and image
docker compose down --remove-orphans

echo "cleaning dangling images..."
docker image prune -f

echo "clearing build cache..."
docker builder prune -f

echo "building frontend fullstack-blog..."
docker compose build --no-cache

echo "starting frontend..."
docker compose up -d

echo "Done!"

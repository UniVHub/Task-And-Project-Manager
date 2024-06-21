#!/bin/bash

# Container name or partial ID to stop
CONTAINER_NAME_OR_ID="container_name_or_partial_id"

# Find the container ID based on the name or partial ID
CONTAINER_ID=$(docker ps -q -f name="$CONTAINER_NAME_OR_ID")

# Check if the container was found
if [ -z "$CONTAINER_ID" ]; then
    echo "Container $CONTAINER_NAME_OR_ID not found running."
    exit 1
fi

# Stop the container
echo "Stopping container $CONTAINER_ID..."
docker stop "$CONTAINER_ID"

# Remove the container
echo "Removing container $CONTAINER_ID..."
docker rm "$CONTAINER_ID"

# Remove the Docker image
echo "Removing Docker image frontend/task-manager..."
docker rmi "frontend/task-manager"
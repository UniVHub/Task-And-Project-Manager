#!/bin/bash

# List of required files
declare -a requiredFiles=("Dockerfile")

# Check if required files exist
for file in "${requiredFiles[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "Error: $file file not found."
        exit 1
    fi
done

# Build Docker image
docker build -t frontend/task-manager ./

# Check if Docker image was built successfully
if [ $? -eq 0 ]; then
    echo "Docker image frontend/task-manager built successfully."
else
    echo "Error building Docker image."
    exit 1
fi

# Run Docker container
docker run -d -p 3000:3000 frontend/task-manager
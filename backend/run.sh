#!/bin/bash


declare -a files=(
	"config_map.yaml"
	"PostgreSQL-storage.yaml"
	"PostgreSQL.yaml"
	"task_manager-storage.yaml"
	"task_manager-backend.yaml"
)

for file in "${files[@]}"; do
	if [ ! -f $file ]; then
		echo -e "Error: $file file not found"
		exit 1
	fi
done

for file in "${files[@]}"; do
	kubectl apply -f $file
done

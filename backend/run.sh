#!/bin/bash


declare -a files=(
	"config_map.yml"
	"PostgreSQL-storage.yml"
	"PostgreSQL.yml"
	"task_manager-storage.yml"
	"task_manager-backend.yml"
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

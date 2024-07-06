#!/bin/bash


declare -a files=(
	"config_map.yml"
	"PostgreSQL.yml"
	"PostgreSQL-storage.yml"
	"task_manager-backend.yml"
	"task_manager-storage.yml"
)

for file in "${files[@]}"; do
	if [ ! -f $file ]; then
		echo -e "Error: $file file not found"
		exit 1
	fi
done

for file in "${files[@]}"; do
	kubectl delete -f $file
done

#!/bin/bash


declare -a files=("config_map.yaml" "PostgreSQL.yaml" "task_manager-backend.yaml")

for file in "${files[@]}"; do
	if [ ! -f $file ]; then
		echo -e "Error: $file file not found"
		exit 1
	fi
done

for file in "${files[@]}"; do
	kubectl delete -f $file
done

#!/bin/bash

declare -a files=("frontend-manager.yml")

for file in "${files[@]}"; do
	if [ ! -f $file ]; then
		echo -e "Error: $file file not found"
		exit 1
	fi
done

for file in "${files[@]}"; do
	kubectl apply -f $file
done

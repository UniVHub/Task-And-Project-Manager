package com.task_manager.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.task_manager.app.model.Log;
import com.task_manager.app.service.LogService;


@RestController
@RequestMapping("/api/logs")
public class LogController {
	private final LogService log_service;

	public LogController(LogService log_service) {
		this.log_service = log_service;
	}


	@GetMapping
	public ResponseEntity <List <Log>> get_all() {
		try {
			List <Log> logs = log_service.find_all();

			if (logs.isEmpty())
				return new ResponseEntity <>(HttpStatus.NO_CONTENT);

			return new ResponseEntity <>(logs, HttpStatus.OK);
		} catch (Exception exception) {
			return new ResponseEntity <>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity <Log> get_by_id(@PathVariable Integer id) {
		Optional <Log> log = log_service.find_by_id(id);

		if (log.isPresent())
			return new ResponseEntity <>(HttpStatus.OK);
		else
			return new ResponseEntity <>(HttpStatus.NOT_FOUND);
	}
}

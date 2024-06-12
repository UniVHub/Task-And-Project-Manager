package com.task_manager.app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.task_manager.app.model.Log;
import com.task_manager.app.model.Project;
import com.task_manager.app.service.LogService;
import com.task_manager.app.service.ProjectService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/projects")
public class ProjectController {
	private final LogService log_service;
	private final ProjectService project_service;

	public ProjectController(LogService log_service,
								ProjectService project_service) {
		this.log_service= log_service;
		this.project_service = project_service;
	}


	@GetMapping
	public ResponseEntity <List <Project>> get_all() {
		Log log = new Log();
		log.setOperation("GET");
		log.setEntity("project");
		log.setEntity_id("all");
		log.setTimestamp(LocalDateTime.now());

		try {
			List <Project> projects = project_service.find_all();

			log.setWas_successful(true);
			log_service.save(log);

			if (projects.isEmpty())
				return new ResponseEntity <>(HttpStatus.NO_CONTENT);

			return new ResponseEntity <>(projects, HttpStatus.OK);
		} catch (Exception exception) {
			log.setWas_successful(false);
			log_service.save(log);
			return new ResponseEntity <>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity <Project> get_by_id(@PathVariable int id) {
		Log log = new Log();
		log.setOperation("GET");
		log.setEntity("project");
		log.setEntity_id(String.valueOf(id));
		log.setTimestamp(LocalDateTime.now());

		Optional <Project> possible_project = project_service.find_by_id(id);
		Project project = null;

		if (possible_project.isPresent()) {
			project = possible_project.get();
			log.setWas_successful(true);
		} else
			log.setWas_successful(false);

		log_service.save(log);

		return log.getWas_successful() ? new ResponseEntity <>(project, HttpStatus.OK) :
										new ResponseEntity <>(HttpStatus.NOT_FOUND);

	}

	@PostMapping
	public ResponseEntity <Project> create(@RequestBody Project project) {
		Log log = new Log();
		log.setOperation("POST");
		log.setEntity("project");
		log.setTimestamp(LocalDateTime.now());

		try {
			project.setCreation_date(LocalDateTime.now());
			Project saved_project = project_service.save(project);

			log.setWas_successful(true);
			log.setEntity_id(Integer.toString(saved_project.getId()));
			log_service.save(log);

			return new ResponseEntity <>(saved_project, HttpStatus.CREATED);
		} catch (Exception exception) {
			log.setWas_successful(false);
			log_service.save(log);
			return new ResponseEntity <>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity <Project> update(@PathVariable int id,
											@RequestBody Project input_project) {
		Log log = new Log();
		log.setOperation("PUT");
		log.setEntity("project");
		log.setEntity_id(Integer.toString(id));
		log.setTimestamp(LocalDateTime.now());

		try {
			Optional <Project> possible_project = project_service.find_by_id(id);
			Project saved_project = null;

			if (possible_project.isPresent()) {
				Project project = possible_project.get();

				project.setName(input_project.getName());
				project.setDescription(input_project.getDescription());
				project.setCreation_date(input_project.getCreation_date());
				project.setTermination_date(input_project.getTermination_date());

				saved_project = project_service.save(project);
				log.setEntity_id(Integer.toString(saved_project.getId()));
				log.setWas_successful(true);
			} else
				log.setWas_successful(false);

			log_service.save(log);

			return log.getWas_successful() ? new ResponseEntity <>(saved_project, HttpStatus.OK) :
											new ResponseEntity <>(HttpStatus.NOT_FOUND);
		} catch (Exception exception) {
			log.setWas_successful(false);
			log_service.save(log);
			return new ResponseEntity <>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity <HttpStatus> delete(@PathVariable int id) {
		Log log = new Log();
		log.setOperation("DELETE");
		log.setEntity("project");
		log.setTimestamp(LocalDateTime.now());

		try {
			project_service.delete_by_id(id);

			log.setWas_successful(true);
			log.setEntity_id(Integer.toString(id));
		} catch (Exception exception) {
			log.setWas_successful(false);
		} finally {
			log_service.save(log);
		}

		return log.getWas_successful() ? new ResponseEntity <>(HttpStatus.OK) :
										new ResponseEntity <>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@DeleteMapping
	public ResponseEntity <HttpStatus> delete_all() {
		Log log = new Log();
		log.setOperation("DELETE");
		log.setEntity("project");
		log.setTimestamp(LocalDateTime.now());

		try {
			project_service.delete_all();

			log.setWas_successful(true);
			log.setEntity_id("all");
		} catch (Exception exception) {
			log.setWas_successful(false);
		} finally {
			log_service.save(log);
		}

		return log.getWas_successful() ? new ResponseEntity <>(HttpStatus.OK) :
										new ResponseEntity <>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
}


package com.task_manager.app.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.task_manager.app.model.Log;
import com.task_manager.app.model.LogEntityType;
import com.task_manager.app.model.LogPetitionType;
import com.task_manager.app.model.Project;
import com.task_manager.app.model.Task;
import com.task_manager.app.service.LogService;
import com.task_manager.app.service.ProjectService;
import com.task_manager.app.service.TaskService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/tasks")
public class TaskController {
	private final LogService log_service;
	private final ProjectService project_service;
	private final TaskService task_service;

	public TaskController(LogService log_service, ProjectService project_service,
							TaskService task_service) {
		this.log_service = log_service;
		this.project_service = project_service;
		this.task_service = task_service;
	}


	@GetMapping("/by_project_id/{id}")
	public ResponseEntity <List <Task>> get_all(@PathVariable int id) {
		Log log = new Log();
		log.setOperation(LogPetitionType.GET);
		log.setEntity(LogEntityType.TASK);
		log.setDescription("all tasks associate with the project with the ID: " + Integer.toString(id));
		log.setTimestamp(LocalDateTime.now());

		try {
			Optional <Project> possbile_project = project_service.find_by_id(id);
			List <Task> tasks = null;

			if (possbile_project.isPresent()) {
				Project project = possbile_project.get();
				tasks = project.getTasks();

				if (tasks.isEmpty())
					return new ResponseEntity <>(HttpStatus.NO_CONTENT);

				log.setWas_successful(true);
			} else
				log.setWas_successful(false);

			log_service.save(log);

			return log.getWas_successful() ? new ResponseEntity <>(tasks, HttpStatus.OK)
					: new ResponseEntity <>(HttpStatus.NOT_FOUND);

		} catch (Exception exception) {
			log.setWas_successful(false);
			log_service.save(log);
			return new ResponseEntity <>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity <Task> get_by_id(@PathVariable int id) {
		Log log = new Log();
		log.setOperation(LogPetitionType.GET);
		log.setEntity(LogEntityType.TASK);
		log.setDescription(Integer.toString(id));
		log.setTimestamp(LocalDateTime.now());

		Optional <Task> possible_task = task_service.find_by_id(id);
		Task task = null;

		if (possible_task.isPresent()) {
			task = possible_task.get();
			log.setWas_successful(true);
		} else
			log.setWas_successful(false);

		log_service.save(log);

		return log.getWas_successful() ? new ResponseEntity <>(task, HttpStatus.OK) :
				 						new ResponseEntity <>(HttpStatus.NOT_FOUND);

	}

	@PostMapping("/{project_id}")
	public ResponseEntity <Task> create(@RequestBody Task task, @PathVariable int project_id) {
		Log log = new Log();
		log.setOperation(LogPetitionType.POST);
		log.setEntity(LogEntityType.TASK);
		log.setDescription(Integer.toString(project_id));
		log.setTimestamp(LocalDateTime.now());

		try {
			Optional <Project> possbile_project = project_service.find_by_id(project_id);
			Task saved_task = null;

			if (possbile_project.isPresent()) {
				Project project = possbile_project.get();

				Task created_task = new Task();
				created_task.setProject(project);
				created_task.setName(task.getName());
				created_task.setDescription(task.getDescription());
				created_task.setCreation_date(LocalDateTime.now());

				saved_task = task_service.save(created_task);

				log.setWas_successful(true);
			} else
				log.setWas_successful(false);

			log_service.save(log);

			return log.getWas_successful() ? new ResponseEntity <>(saved_task, HttpStatus.CREATED) :
											new ResponseEntity <>(HttpStatus.NOT_FOUND);

		} catch (Exception exception) {
			log.setWas_successful(false);
			log_service.save(log);
			return new ResponseEntity <>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity <Task> update(@PathVariable int id, @RequestBody Task task) {
		Log log = new Log();
		log.setOperation(LogPetitionType.PUT);
		log.setEntity(LogEntityType.TASK);
		log.setDescription(Integer.toString(id));
		log.setTimestamp(LocalDateTime.now());

		try {
			Optional <Task> actual_task = task_service.find_by_id(id);
			Task saved_task = null;

			if (actual_task.isPresent()) {
				Task updated_task = actual_task.get();

				updated_task.setName(task.getName());
				updated_task.setDescription(task.getDescription());
				updated_task.setCreation_date(task.getCreation_date());
				updated_task.setTermination_date(task.getTermination_date());

				saved_task = task_service.save(updated_task);
				log.setWas_successful(true);
			} else
				log.setWas_successful(false);

			log_service.save(log);

			return log.getWas_successful() ? new ResponseEntity <>(saved_task, HttpStatus.OK) :
					 						new ResponseEntity <>(HttpStatus.NOT_FOUND);
		} catch (Exception exception) {
			log.setWas_successful(false);
			log_service.save(log);
			return new ResponseEntity <>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping
	public ResponseEntity <HttpStatus> delete(@PathVariable int id) {
		Log log = new Log();
		log.setOperation(LogPetitionType.DELETE);
		log.setEntity(LogEntityType.TASK);
		log.setDescription(Integer.toString(id));
		log.setTimestamp(LocalDateTime.now());

		try {
			task_service.delete_by_id(id);
			log.setWas_successful(true);
		} catch (Exception exception) {
			log.setWas_successful(false);
		} finally {
			log_service.save(log);
		}

		return log.getWas_successful() ? new ResponseEntity <>(HttpStatus.OK) :
										new ResponseEntity <>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@DeleteMapping("/delete_all_tasks")
	public ResponseEntity <HttpStatus> delete_all() {
		Log log = new Log();
		log.setOperation(LogPetitionType.DELETE);
		log.setEntity(LogEntityType.TASK);
		log.setDescription("all");
		log.setTimestamp(LocalDateTime.now());

		try {
			task_service.delete_all();
			log.setWas_successful(true);
		} catch (Exception exception) {
			log.setWas_successful(false);
		} finally {
			log_service.save(log);
		}

		return log.getWas_successful() ? new ResponseEntity <>(HttpStatus.OK) :
										new ResponseEntity <>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@GetMapping("/search/{name}")
	public ResponseEntity <List <Task>> search(@RequestParam String name) {
		Log log = new Log();
		log.setOperation(LogPetitionType.GET);
		log.setEntity(LogEntityType.TASK);
		log.setDescription("all");
		log.setTimestamp(LocalDateTime.now());

		List <Task> filtered_tasks = new ArrayList <>();

		try {
			List <Task> tasks = task_service.find_all();

			for (Task task : tasks)
				if (task.getName().contains(name))
					filtered_tasks.add(task);

			log.setWas_successful(true);
		} catch (Exception exception) {
			log.setWas_successful(false);
		} finally {
			log_service.save(log);
		}
		return log.getWas_successful() ? new ResponseEntity <>(filtered_tasks, HttpStatus.OK) :
											new ResponseEntity <>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
}

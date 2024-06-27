package com.task_manager.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.task_manager.app.model.Task;
import com.task_manager.app.repository.TaskRepository;


@Service
public class TaskService {
	private final TaskRepository task_repository;

	public TaskService(TaskRepository task_repository) {
		this.task_repository = task_repository;
	}


	@Transactional(readOnly = true)
	public List <Task> find_all() {
		return task_repository.findAll();
	}

	@Transactional(readOnly = true)
	public Optional <Task> find_by_id(Integer id) {
		return task_repository.findById(id);
	}

	@Transactional
	public Task save(Task task) {
		return task_repository.save(task);
	}

	@Transactional
	public void delete_by_id(Integer id) {
		task_repository.deleteById(id);
	}

	@Transactional
	public void delete_all() {
		task_repository.deleteAll();
	}

	@Transactional
	public boolean exists(Integer id) {
		return task_repository.existsById(id);
	}

	@Transactional
	public Optional <Task> find_top() {
		return task_repository.findTopByOrderByIdDesc();
	}
}

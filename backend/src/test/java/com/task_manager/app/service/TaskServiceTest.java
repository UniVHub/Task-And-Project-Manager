package com.task_manager.app.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.task_manager.app.model.Project;
import com.task_manager.app.model.Task;


@SpringBootTest
public class TaskServiceTest {
	@Autowired
	ProjectService project_service;

	@Autowired
	TaskService task_service;

	private Task task;


	@BeforeEach
	void set_up() {
		Project project = new Project();
		project.setName("project");
		project.setDescription("project description");
		project.setCreation_date(LocalDateTime.now());
		project_service.save(project);

		task = new Task();
		task.setProject(project);
		task.setName("task");
		task.setDescription("task description");
		task.setCreation_date(LocalDateTime.now());
	}

	@Test
	public void find_all() {
		Task saved_task = task_service.save(task);
		List <Task> tasks = task_service.find_all();

		assertNotNull(tasks);
		assertEquals(1, tasks.size());
		assertEquals(saved_task.getId(), tasks.get(0).getId());
	}

	@Test
	public void find_by_id() {
		Task saved_task = task_service.save(task);
		Optional <Task> found_task = task_service.find_by_id(saved_task.getId());

		assertTrue(found_task.isPresent());
		assertEquals(saved_task.getId(), found_task.get().getId());
	}

	@Test
	public void save() {
		Task saved_task = task_service.save(task);

		assertNotNull(saved_task);
		assertEquals(saved_task.getId(), saved_task.getId());
	}

	@Test
	public void delete_by_id() {
		Task saved_task = task_service.save(task);
		task_service.delete_by_id(saved_task.getId());

		Optional <Task> found_task = task_service.find_by_id(saved_task.getId());
		assertFalse(found_task.isPresent());
	}

	@Test
	public void deleteAll() {
		task_service.save(task);
		task_service.delete_all();

		List <Task> tasks = task_service.find_all();
		assertTrue(tasks.isEmpty());
	}
}

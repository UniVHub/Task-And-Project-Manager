package com.task_manager.app.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.task_manager.app.model.Project;
import com.task_manager.app.model.Task;
import com.task_manager.app.repository.ProjectRepository;
import com.task_manager.app.repository.TaskRepository;
import com.task_manager.app.service.LogService;
import com.task_manager.app.service.ProjectService;
import com.task_manager.app.service.TaskService;


@ActiveProfiles("test")
@WebMvcTest(TaskController.class)
public class TaskControllerTest {
	@Autowired
	private MockMvc mvc;

	@MockBean
	private LogService log_service;

	@MockBean
	private ProjectRepository project_repository;

	@MockBean
	private ProjectService project_service;

	@MockBean
	private TaskRepository task_repository;

	@MockBean
	private TaskService task_service;

	private Project project;
	private Task task;


	@BeforeEach
	public void set_up() {
		project = new Project();
		project.setId(1);
		project.setName("project");
		project.setDescription("project description");
		project.setCreation_date(LocalDateTime.now());

		task = new Task();
		task.setId(1);
		task.setName("task");
		task.setDescription("task description");
		task.setCreation_date(LocalDateTime.now());
		task.setProject(project);

		project.setTasks(Collections.singletonList(task));
	}

	@Test
	public void get_all() throws Exception {
		when(project_service.find_by_id(anyInt())).thenReturn(Optional.of(project));

		mvc.perform(get("/api/tasks/by_project/1"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].name").value("task"));
	}

	@Test
	public void get_by_id() throws Exception {
		when(task_service.find_by_id(anyInt())).thenReturn(Optional.of(task));

		mvc.perform(get("/api/tasks/1"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.name").value("task"));
	}

	@Test
	public void create() throws Exception {
		when(project_service.find_by_id(anyInt())).thenReturn(Optional.of(project));
		when(task_service.save(any(Task.class))).thenReturn(task);

		ObjectMapper object_mapper = new ObjectMapper();
		object_mapper.registerModule(new JavaTimeModule());

		mvc.perform(post("/api/tasks/1")
						.contentType(MediaType.APPLICATION_JSON)
						.content(object_mapper.writeValueAsString(task)))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.name").value("task"));
	}

	@Test
	public void update() throws Exception {
		when(task_service.find_by_id(anyInt())).thenReturn(Optional.of(task));
		when(task_service.save(any(Task.class))).thenReturn(task);

		ObjectMapper object_mapper = new ObjectMapper();
		object_mapper.registerModule(new JavaTimeModule());

		mvc.perform(put("/api/tasks/1")
				.contentType(MediaType.APPLICATION_JSON)
				.content(object_mapper.writeValueAsString(task)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.name").value("task"));
	}

	@Test
	public void delete_task() throws Exception {
		doNothing().when(task_service).delete_by_id(anyInt());

		mvc.perform(delete("/api/tasks/1"))
				.andExpect(status().isOk());
	}

	@Test
	public void delete_all() throws Exception {
		when(project_service.find_by_id(anyInt())).thenReturn(Optional.of(project));
		doNothing().when(task_service).delete_by_id(anyInt());

		mvc.perform(delete("/api/tasks/by_project/1"))
				.andExpect(status().isOk());
	}

	@Test
	public void search() throws Exception {
		when(project_service.find_by_id(anyInt())).thenReturn(Optional.of(project));

		ObjectMapper object_mapper = new ObjectMapper();
		object_mapper.registerModule(new JavaTimeModule());

		mvc.perform(get("/api/tasks/search/1/*")
				.contentType(MediaType.APPLICATION_JSON)
				.content(object_mapper.writeValueAsString(task)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].name").value("task"));
	}

	@Test
	public void last_created_id() throws Exception {
		when(task_service.find_top()).thenReturn(Optional.of(task));

		mvc.perform(get("/api/tasks/last_created_id")
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").value(Integer.toString(task.getId())));
	}
}

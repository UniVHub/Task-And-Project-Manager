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
import com.task_manager.app.repository.ProjectRepository;
import com.task_manager.app.service.LogService;
import com.task_manager.app.service.ProjectService;


@ActiveProfiles("test")
@WebMvcTest(ProjectController.class)
public class ProjectControllerTest {
	@Autowired
	private MockMvc mvc;

	@MockBean
	private LogService log_service;

	@MockBean
	private ProjectRepository repository;

	@MockBean
	private ProjectService service;

	private Project project;


	@BeforeEach
	public void set_up() {
		project = new Project();
		project.setId(1);
		project.setName("project");
		project.setDescription("project description");
		project.setCreation_date(LocalDateTime.now());
	}

	@Test
	public void get_all() throws Exception {
		when(service.find_all()).thenReturn(Collections.singletonList(project));

		mvc.perform(get("/api/projects"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].name").value("project"));
	}

	@Test
	public void get_by_id() throws Exception {
		when(service.find_by_id(anyInt())).thenReturn(Optional.of(project));

		mvc.perform(get("/api/projects/1"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.name").value("project"));
	}

	@Test
	public void create() throws Exception {
		when(service.save(any(Project.class))).thenReturn(project);

		ObjectMapper object_mapper = new ObjectMapper();
		object_mapper.registerModule(new JavaTimeModule());

		mvc.perform(post("/api/projects")
						.contentType(MediaType.APPLICATION_JSON)
						.content(object_mapper.writeValueAsString(project)))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.name").value("project"));
	}

	@Test
	public void update() throws Exception {
		when(service.find_by_id(anyInt())).thenReturn(Optional.of(project));
		when(service.save(any(Project.class))).thenReturn(project);

		ObjectMapper object_mapper = new ObjectMapper();
		object_mapper.registerModule(new JavaTimeModule());

		mvc.perform(put("/api/projects/1")
				.contentType(MediaType.APPLICATION_JSON)
				.content(object_mapper.writeValueAsString(project)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.name").value("project"));
	}

	@Test
	public void delete_project() throws Exception {
		doNothing().when(service).delete_by_id(anyInt());

		mvc.perform(delete("/api/projects/1"))
				.andExpect(status().isOk());
	}

	@Test
	public void delete_all() throws Exception {
		doNothing().when(service).delete_all();

		mvc.perform(delete("/api/projects"))
				.andExpect(status().isOk());
	}

	@Test
	public void pages() throws Exception {
		when(service.find_all()).thenReturn(Collections.singletonList(project));

		mvc.perform(get("/api/projects/pages/*/1")
					.contentType(MediaType.APPLICATION_JSON))
					.andExpect(status().isOk())
					.andExpect(jsonPath("$").value("1"));
	}

	@Test
	public void search() throws Exception {
		when(service.find_all()).thenReturn(Collections.singletonList(project));

		ObjectMapper object_mapper = new ObjectMapper();
		object_mapper.registerModule(new JavaTimeModule());

		mvc.perform(get("/api/projects/search/*/8/0")
				.contentType(MediaType.APPLICATION_JSON)
				.content(object_mapper.writeValueAsString(project)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].name").value("project"));
	}

	@Test
	public void last_created_id() throws Exception {
		when(service.find_top()).thenReturn(Optional.of(project));

		mvc.perform(get("/api/projects/last_created_id")
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$").value(Integer.toString(project.getId())));
	}
}

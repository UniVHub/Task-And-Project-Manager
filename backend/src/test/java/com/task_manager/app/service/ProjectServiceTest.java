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
import org.springframework.test.context.ActiveProfiles;

import com.task_manager.app.model.Project;


@ActiveProfiles("test")
@SpringBootTest
public class ProjectServiceTest {
	@Autowired
	ProjectService service;

	private Project project;


	@BeforeEach
	public void set_up() {
		service.delete_all();

		project = new Project();
		project.setName("project");
		project.setDescription("project description");
		project.setCreation_date(LocalDateTime.now());
	}

	@Test
	public void find_all() {
		service.save(project);
		List <Project> projects = service.find_all();

		assertNotNull(projects);
		assertEquals(1, projects.size());
		assertEquals("project", projects.get(0).getName());
	}

	@Test
	public void find_by_id() {
		Project saved_project = service.save(project);
		Optional <Project> found_project = service.find_by_id(saved_project.getId());

		assertTrue(found_project.isPresent());
		assertEquals(saved_project.getName(), found_project.get().getName());
	}

	@Test
	public void save() {
		Project saved_project = service.save(project);

		assertNotNull(saved_project);
		assertEquals("project", saved_project.getName());
	}

	@Test
	public void delete_by_id() {
		Project saved_project = service.save(project);
		service.delete_by_id(saved_project.getId());

		Optional <Project> found_project = service.find_by_id(saved_project.getId());
		assertFalse(found_project.isPresent());
	}

	@Test
	public void testDeleteAll() {
		service.save(project);
		service.delete_all();

		List <Project> projects = service.find_all();
		assertTrue(projects.isEmpty());
	}
}

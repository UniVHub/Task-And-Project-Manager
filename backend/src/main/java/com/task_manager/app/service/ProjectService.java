package com.task_manager.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.task_manager.app.model.Project;
import com.task_manager.app.repository.ProjectRepository;


@Service
public class ProjectService {
	private final ProjectRepository project_repository;

	public ProjectService(ProjectRepository project_repository) {
		this.project_repository = project_repository;
	}


	@Transactional(readOnly = true)
	public List <Project> find_all() {
		return project_repository.findAll();
	}

	@Transactional(readOnly = true)
	public Optional <Project> find_by_id(Integer id) {
		return project_repository.findById(id);
	}

	@Transactional
	public Project save(Project project) {
		return project_repository.save(project);
	}

	@Transactional
	public void delete_by_id(Integer id) {
		project_repository.deleteById(id);
	}

	@Transactional
	public void delete_all() {
		project_repository.deleteAll();
	}

	@Transactional
	public Optional <Project> find_top() {
		return project_repository.findTopByOrderByIdDesc();
	}
}

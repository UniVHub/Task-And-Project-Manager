package com.task_manager.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.task_manager.app.model.Log;
import com.task_manager.app.repository.LogRepository;

@Service
public class LogService {
	private final LogRepository log_repository;

	public LogService(LogRepository log_repository) {
		this.log_repository = log_repository;
	}

	@Transactional(readOnly = true)
	public List <Log> find_all() {
		return log_repository.findAll();
	}

	@Transactional(readOnly = true)
	public Optional <Log> find_by_id(int id) {
		return log_repository.findById(id);
	}

	@Transactional
	public Log save(Log log) {
		return log_repository.save(log);
	}

	@Transactional
	public void delete_by_id(int id) {
		log_repository.deleteById(id);
	}

	@Transactional
	public void delete_all() {
		log_repository.deleteAll();
	}
}

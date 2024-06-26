package com.task_manager.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.task_manager.app.model.Task;


@Repository
public interface TaskRepository extends JpaRepository <Task, Integer> {
	Optional <Task> findTopByOrderByIdDesc();
}

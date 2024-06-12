package com.task_manager.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.task_manager.app.model.Project;


@Repository
public interface ProjectRepository extends JpaRepository <Project, Integer> {

}

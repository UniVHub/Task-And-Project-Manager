package com.task_manager.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.task_manager.app.model.Log;


@Repository
public interface LogRepository extends JpaRepository <Log, Integer> {

}

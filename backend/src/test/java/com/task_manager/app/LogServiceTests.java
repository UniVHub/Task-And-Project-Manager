package com.task_manager.app;

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

import com.task_manager.app.model.Log;
import com.task_manager.app.model.LogEntityType;
import com.task_manager.app.model.LogPetitionType;
import com.task_manager.app.service.LogService;

//@ActiveProfiles("testing")
@SpringBootTest
public class LogServiceTests {
	@Autowired
	LogService service;

	private Log log;


	@BeforeEach
	void set_up() {
		log = new Log();
		log.setOperation(LogPetitionType.DELETE);
		log.setEntity(LogEntityType.PROJECT);
		log.setDescription("generic ID");
		log.setTimestamp(LocalDateTime.now());
		log.setWas_successful(true);
	}

	@Test
	public void find_all() {
		service.save(log);
		List <Log> logs = service.find_all();

		assertNotNull(logs);
		assertEquals(1, logs.size());
		assertEquals(LogPetitionType.DELETE, logs.get(0).getOperation());
	}

	@Test
	public void find_by_id() {
		Log saved_log = service.save(log);
		Optional <Log> found_log = service.find_by_id(saved_log.getId());

		assertTrue(found_log.isPresent());
		assertEquals(saved_log.getId(), found_log.get().getId());
	}

	@Test
	public void save() {
		Log saved_log = service.save(log);

		assertNotNull(saved_log);
		assertEquals(LogEntityType.PROJECT, saved_log.getEntity());
	}

	@Test
	public void delete_by_id() {
		Log saved_log = service.save(log);
		service.delete_by_id(saved_log.getId());

		Optional <Log> found_log = service.find_by_id(saved_log.getId());
		assertFalse(found_log.isPresent());
	}

	@Test
	public void testDeleteAll() {
		service.save(log);
		service.delete_all();

		List <Log> logs = service.find_all();
		assertTrue(logs.isEmpty());
	}
}

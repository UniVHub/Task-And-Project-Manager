package com.task_manager.app.model;

import lombok.*;

import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
@NoArgsConstructor
@Setter
@Getter
@ToString
public class Log {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(nullable = false)
	private String operation;

	@Column(nullable = false)
	private String entity;

	@Column(nullable = false)
	private String entity_id;

	@Column(nullable = false)
	private LocalDateTime timestamp;

	@Column(nullable = false)
	private Boolean was_successful;
}

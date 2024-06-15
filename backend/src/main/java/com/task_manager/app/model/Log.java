package com.task_manager.app.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@AllArgsConstructor
@Entity
@Getter
@NoArgsConstructor
@Setter
@ToString
public class Log {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private LogPetitionType operation;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private LogEntityType entity;

	@Column(nullable = false)
	private String description;

	@Column(nullable = false)
	private LocalDateTime timestamp;

	@Column(nullable = false)
	private Boolean was_successful;
}

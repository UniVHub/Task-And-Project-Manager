/**
 * Represents a project.
 */
export interface ProjectInterface {
  id: number;
  name: string;
  description: string;
  creation_date: string;
  termination_date: string | null;
}

/**
 * Represents a project form.
 */
export interface ProjectFormInterface extends Partial<ProjectInterface> {
  name: string;
  description: string;
}

/**
 * Represents the interface for a task.
 */
export interface TaskInterface {
  id: number;
  name: string;
  description: string;
  creation_date: string;
  termination_date: string | null;
  projectId: number;
}


/**
 * Represents the interface for a task form.
 * It extends the `TaskInterface` interface and includes additional properties for creating or updating a task.
 */
export interface TaskFormInterface extends Partial<TaskInterface> {
  name: string;
  description: string;
}

/**
 * Represents the interface for logs.
 */
export interface LogsInterface {
  id: number;
  operation: string;
  entity: string;
  description: string;
  timestamp: string;
  was_successful: boolean;
}

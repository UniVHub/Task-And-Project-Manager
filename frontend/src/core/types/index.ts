/**
 * Represents a project.
 */
export interface ProjectInterface {
  id?: number;
  name: string;
  description: string;
  creationDate: string;
  terminationDate: string | null;
}


/**
 * Represents a project form.
 */
export interface ProjectFormInterface extends Partial<ProjectInterface> {
  name: string;
  description: string;
}